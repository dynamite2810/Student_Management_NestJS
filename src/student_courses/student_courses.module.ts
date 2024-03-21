import { Module } from '@nestjs/common';
import { Student_CoursesService } from './student_courses.service';
import { Student_CoursesController } from './student_courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student_Course } from './entities/student_course.entity';
import { CoursesService } from 'src/courses/courses.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student_Course, User, Course])],
  controllers: [Student_CoursesController],
  providers: [Student_CoursesService, UsersService, CoursesService],
  exports: [CoursesService],
})
export class StudentCoursesModule {}
