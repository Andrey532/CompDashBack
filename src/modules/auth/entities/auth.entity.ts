import { Exclude } from 'class-transformer';
import { Company } from 'src/modules/companies/entity/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  phone_number: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true, default: '' })
  owner: string;

  @Column('simple-array', { default: 'user' })
  roles: string[];

  @OneToMany(() => Company, (company) => company.auth)
  companies: Company[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  constructor(auth: Partial<Auth>) {
    Object.assign(this, auth);
  }
}