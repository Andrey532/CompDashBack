import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from '../entities/auth.entity';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { TokenDto } from '../dto/token.dto';
import * as bcrypt from 'bcrypt';
import { RefreshTokensDto } from '../dto/refresh-token.dto';
import { ResetPasswordDto } from '../dto/reset-pasword.dto';
import { LogoutService } from './logout.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly logoutService: LogoutService,
    private readonly tokenService: TokenService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  async signUp(signUp: SignUpDto): Promise<{
    statusCode: number;
    message: string;
  }> {
    const hashedPassword = await this.hashPassword(signUp.password);
    const signUpUser = new Auth({
      ...signUp,
      password: hashedPassword,
    });
    const saveUser = await this.authRepository.save(signUpUser);

    saveUser.owner = saveUser.id.toString();

    await this.authRepository.save(saveUser);

    return {
      statusCode: 201,
      message: `The user with email: ${saveUser.email} has been successfully created!`,
    };
  }

  existMail(email: string): Promise<Auth> {
    return this.authRepository.findOne({ where: { email } });
  }

  async signIn({ email, password }: SignInDto): Promise<TokenDto | null> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`User with ${email} is not found`);

    user.owner = user.id.toString();

    const comparePassword = await this.comparePassword(
      password,
      user.password,
    );

    if (!comparePassword) throw new UnauthorizedException('Incorrect password');

    const payload = { sub: user.id, userName: user.email, roles: user.roles };

    const { id } = user;

    return {
      id,
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }

  async logout(
    token: string,
  ): Promise<{ message: string; statusCode: number }> {
    await this.logoutService.blackListToken(token.split(' ')[1]);

    return { message: 'Logged out successfully', statusCode: 200 };
  }

  async refresh({ refresh_token }: RefreshTokensDto): Promise<RefreshTokensDto> {
    try {
      const decodeRefreshToken: { sub: string } =
        await this.jwtService.verifyAsync(refresh_token);

      const user = await this.authRepository.findOne({
        where: { id: +decodeRefreshToken.sub },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const payload = { sub: user.id, userName: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '5d',
        }),
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async resetPassword({ oldPassword, newPassword }: ResetPasswordDto, token: string): Promise<{message: string}> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const user = await this.authRepository.findOne({
      where: { id: +decodedToken.sub },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comparePassword = await this.comparePassword(
      oldPassword,
      user.password,
    );

    if (!comparePassword) throw new UnauthorizedException('Incorrect password');

    const hashedPassword = await this.hashPassword(newPassword);
    
    user.password = hashedPassword

    await this.authRepository.save(user);

    return {
      message: "Password has successfully changed"
    }
  }
}