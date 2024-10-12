import { Module } from '@nestjs/common';
import { DatabaseConfig } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/companies/company.module';

@Module({
  imports: [DatabaseConfig, AuthModule, CompanyModule],
})
export class AppModule { }
