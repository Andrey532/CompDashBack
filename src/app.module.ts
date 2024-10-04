import { Module } from '@nestjs/common';
import { DatabaseConfigMod } from './database/database.module';

@Module({
  imports: [DatabaseConfigMod],
})
export class AppModule {}
