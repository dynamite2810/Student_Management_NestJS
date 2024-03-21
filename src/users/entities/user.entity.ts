
import { Student_Course } from 'src/student_courses/entities/student_course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity() 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId', nullable: false })
  userId: string;

  @Column({ name: 'roleId', nullable: false })
  roleId: number;

  @Column({ name: 'fullName', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'phoneNumber', nullable: false })
  phoneNumber: number;

  @Column({ name: 'gender', nullable: false })
  gender: string;

  @OneToMany(() => Student_Course, student_course => student_course.user)
  student_courses: Student_Course[];
}