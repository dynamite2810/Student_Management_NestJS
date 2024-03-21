

import { Student_Course } from 'src/student_courses/entities/student_course.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('courses') 
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'courseId', nullable: false })
  courseId: string;

  @Column({ name: 'startTime', nullable: false })
  startTime: number;

  @Column({ name: 'endTime', nullable: false })
  endTime: number;

  @Column({ name: 'date', nullable: false })
  date: string;

  @Column({ name: 'teacherId', nullable: false })
  teacherId: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @OneToMany(() => Student_Course, student_courses => student_courses.course)
  student_courses: Student_Course[];
}