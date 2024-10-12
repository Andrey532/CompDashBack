import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogoutService } from '../auth/services/logout.service';
import { Auth } from '../auth/entities/auth.entity';
import { Logout } from '../auth/entities/logout.entity';
import { TokenService } from '../auth/services/token.service';



@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Auth, Logout]),
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
    controllers: [CompanyController],
    providers: [AuthGuard, CompanyService, LogoutService, TokenService],
})
export class CompanyModule { }