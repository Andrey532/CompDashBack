import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Logout {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable: false})
    token: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    constructor(blackList: Partial<Logout>) {
        Object.assign(this, blackList);
    }
  }