import * as bcrypt from 'bcrypt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Auth } from '../modules/auth/entities/auth.entity';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();

const dataSource = new DataSource({
  type: 'postgres',
  username: configService.get<string>('POSTGRES_USER'),
  database: configService.get<string>('POSTGRES_DB'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  synchronize: configService.get<boolean>('POSTGRES_SYNC'),
  entities: [Auth],
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  logging: false,
});

const seed = async () => {
  const connection = await dataSource.initialize();
  const authRepository = connection.getRepository(Auth);

  const saltRounds = 10;
  const plainPassword = 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  const superAdmin = authRepository.create({
    email: "super@gmail.com",
    password: hashedPassword,
    first_name: "superName",
    last_name: "superLastName",
    owner: "",
    phone_number: "1234567890",
    roles: ["super-admin"],
    createdAt: new Date(),
  });

  await authRepository.save(superAdmin);

  console.log(JSON.stringify(superAdmin) + 'Seed completed.');
  await dataSource.destroy();
};

seed().catch(console.error);