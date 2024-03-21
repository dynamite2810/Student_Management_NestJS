import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin') 
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fullName', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;
}