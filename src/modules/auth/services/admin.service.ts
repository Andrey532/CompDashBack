import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Auth } from '../entities/auth.entity';
import { TokenService } from './token.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { UpdateUsersDto } from '../dto/update-users.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly tokenService: TokenService,
    ) { }

    async createAdmin(
        createAdmin: SignUpDto,
    ) {

        const newAdmin = new Auth({ ...createAdmin, roles: ["admin"] });

        this.authRepository.save(newAdmin);

        return { message: "Admin has successfully created" }
    }

    async getAllUsers(
        token: string,
    ): Promise<Auth[]> {
        const decodedToken: { sub: string } =
            await this.tokenService.decoder(token);

        const superAdmin = await this.authRepository.find({
            where: { id: +decodedToken.sub },
            relations: ['companies'],
        });
        if (!superAdmin) {
            throw new NotFoundException('Super Admin not found');
        }

        const users = await this.authRepository.find({
            where: { roles: Not('super-admin') },
            relations: ['companies'],
        });

        return plainToInstance(Auth, users);
    }

    async updateUsers(
        id: number,
        updateUsers: UpdateUsersDto,
        token: string,
    ): Promise<{ message: string }> {
        const decodedToken: { sub: string } =
            await this.tokenService.decoder(token);

        const user = await this.authRepository.findOne({
            where: { id: +decodedToken.sub },
            // relations: ['companies'],
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.id !== user.id) {
            throw new UnauthorizedException(
                'You do not have permission to update this user',
            );
        }

        await this.authRepository.update({ id }, { ...updateUsers });
        return { message: "User has successfully updated" }
    }

    async deleteUser(id: number, token: string): Promise<any> {

        await this.authRepository.delete({ id })
    }
}