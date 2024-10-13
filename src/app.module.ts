import { Module } from '@nestjs/common';
import { DatabaseConfig } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/companies/company.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseConfig, AuthModule, CompanyModule, CloudinaryModule],
})
export class AppModule { }
