import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Auth } from 'src/modules/auth/entities/auth.entity';

@Entity({ name: 'company' })
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    service_of_activity: string;

    @Column({ nullable: false })
    number_of_employees: number;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    type: string;

    @Column({ nullable: false })
    capital: number

    @Exclude()
    @ManyToOne(() => Auth, (auth) => auth.companies)
    auth: Auth;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    constructor(company: Partial<Company>) {
        Object.assign(this, company);
    }
}