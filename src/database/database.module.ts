import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DB'),
        synchronize: configService.get<boolean>('SYNC'),
        autoLoadEntities: configService.get<boolean>('AUTO'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ConfigModule, TypeOrmModule],
})
export class DatabaseConfigMod {}