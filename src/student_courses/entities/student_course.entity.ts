
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity() 
export class Student_Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'studentId', nullable: false })
  studentId: number;

  @Column({ name: 'courseId', nullable: false })
  courseId: number;

  @ManyToOne(() => User, user => user.student_courses)
  user: User;

  @ManyToOne(() => Course, course => course.student_courses)
  course: Course;
}