import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryProvider } from './cloudinary.provider';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../companies/company.module';
import { Logout } from '../auth/entities/logout.entity';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';
import { LogoutService } from '../auth/services/logout.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
        }),
        AuthModule, CompanyModule,
        TypeOrmModule.forFeature([Logout]),
    ],
    controllers: [CloudinaryController],
    providers: [
        CloudinaryProvider,
        CloudinaryService,
        JwtService,
        LogoutService,
    ],
})
export class CloudinaryModule { }