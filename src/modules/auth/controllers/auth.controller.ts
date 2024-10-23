import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { TokenDto } from '../dto/token.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../entities/auth.entity';
import { AuthService } from '../services/auth.service';
import { RefreshTokensDto } from '../dto/refresh-token.dto';
import { ResetPasswordDto } from '../dto/reset-pasword.dto';
import { AuthGuard } from '../guards/auth.guard';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() signUp: SignUpDto): Promise<{
    statusCode: number;
    message: string;
  }> {
    const existMail: Auth | null = await this.authService.existMail(
      signUp.email,
    );

    if (existMail) {
      throw new HttpException(
        `The ${existMail.email} has already exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.authService.signUp(signUp);
  }

  @Post('sign-in')
  signIn(@Body() signIn: SignInDto): Promise<TokenDto | null> {
    return this.authService.signIn(signIn);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(
    @Headers('Authorization') token: string,
  ): Promise<{ message: string; statusCode: number }> {
    return this.authService.logout(token);
  }

  @Post('refresh')
  refresh(@Body() refresrhToken: RefreshTokensDto): Promise<RefreshTokensDto> {
    return this.authService.refresh(refresrhToken);
  }


  @UseGuards(AuthGuard)
  @Post("reset-password")
  resetPassword(@Body() resetPassword: ResetPasswordDto,
    @Headers('Authorization') token: string,): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPassword, token)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.authService.getUser(id)

  }
}

