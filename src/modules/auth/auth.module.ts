import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Logout } from './entities/logout.entity';
import { LogoutService } from './services/logout.service';
import { TokenService } from './services/token.service';
import { AuthGuard } from './guards/auth.guard';
import { SuperAdminController } from './controllers/super-admin.controller';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([Auth, Logout]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
        })
    ],
    controllers: [AuthController, SuperAdminController, AdminController],
    providers: [AuthGuard, AuthService, LogoutService, TokenService, AdminService],
})
export class AuthModule { }