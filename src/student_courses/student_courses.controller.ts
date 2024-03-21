import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { Authorized, Req, Res, UseBefore } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { CoursesService } from 'src/courses/courses.service';
import { Student_CoursesService } from './student_courses.service';
import { UsersService } from 'src/users/users.service';
import { Student_CourseDto } from './dto/student_courses.dto';
import { Student_Course } from './entities/student_course.entity';
import { AdminAuthGuard } from 'src/auth/guard/admin-auth.guard';
import dataSource from 'db/data-source';
import { User } from 'src/users/entities/user.entity';


@Controller()
  export class Student_CoursesController {
  constructor(
    protected student_courseService: Student_CoursesService, 
    protected userService: UsersService,
    protected courseService: CoursesService,
  ) {
  }

  // @UseGuards(AdminAuthGuard)
  @Post('/add-student-to-course')
  async addStudentToCourse(@Body() body: any) {
    try {
      const data = body;
      const studentId = data.studentId;
      const courseId = data.courseId;
      const course = await this.courseService.findByCondition({
        where: {id: data.courseId}
      });
      if(!course) {
        return {
          message: 'Course ID is not existed'
        }
      }

      const student = await this.userService.findByCondition({
        where: {id: data.studentId}
      });
      if(!student || student.roleId != 2) {
        return {
          message: 'Student ID is not existed'
        }
      }
      const numberStudentInCourse = await this.student_courseService.count({
        where: {courseId: data.courseId}
      })
      // if(numberStudentInCourse >= course.quantity) {
      //   return {
      //     message: 'The course is full'
      //   }
      // }
      
      // const existed = await this.student_courseService.findByCondition({
      //   where: {studentId: data.studentId, courseId: data.courseId}
      // });
      // if(existed) {
      //   return {
      //     message: 'Existed'
      //   }
      // }
      
      // const studentCourseDateExisted_ = await this.courseService.findAllByCondition({
      //   attributes: ['date'],
      //   where: {'$student_course.studentId$': studentId},
      //   include: [{
      //       model: this.student_courseService,
      //       where: {
      //         studentId: studentId,
      //       }
      //   }],
      // })
      // const studentCourseDateExisted_ = await dataSource
      // .createQueryBuilder()
      // .select("user")
      // .from(User, "user")
      // .where("user.id = :id", { id: 1 })
      // .getOne()

    // const user = await dataSource.manager
    // .createQueryBuilder(User, "user")
    // .where("user.id = :id", { id: 1 })
    // .getOne()
    //   console.log(user)
      

    //   const studentCourseTimeExisted_ = await db.Course.findAll({
    //     attributes: ['time'],
    //     where: { date : registerCourseDate, '$student_courses.studentId$': studentId },
    //     include: [{
    //         model: db.Student_Course,
    //     }], 
    // })
    // const studentCourseDateExisted_ = await db.Course.findAll({
    //     attributes: ['date'],
    //     where: {'$student_courses.studentId$': studentId},
    //     include: [{
    //         model: db.Student_Course,
    //     }], 
    // })
      // console.log(studentCourseDateExisted_);
      // const studentCourseDateExisted = studentCourseDateExisted_.map((data) => data.date);
      // console.log(studentCourseDateExisted);
      // if(!studentCourseDateExisted.includes(course.date)) {
      //   await this.student_courseService.create(data)
      //   return {
      //     message: 'Success',
      //     data: data
      //   }
      // }
      // const data1 = await this.student_courseService.findAllByCondition({
      //   where: {studentId: data.studentId}
      // })
      const timeCourseStudentIn_ = await this.courseService.findAllByCondition({
        attributes: ["startTime", "endTime"],
        include: [{
            model: this.student_courseService,
            where: {studentId: data.studentId}
        }],
        where: {date: course.date}
      })

      // console.log(data1);

      // console.log(timeCourseStudentIn_);
      const timeCourseStudentIn = timeCourseStudentIn_.map(data => data)
      // console.log(timeCourseStudentIn);
      // if(timeCourseStudentIn.startTime)
      
      // await this.student_courseService.create(data)
      return {
        message: 'Success',
        data: data
      } 
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed',
      }
    }
  }

  @UseGuards(AdminAuthGuard)
  @Post('/delete-student-from-course')
  async deleteGameFromCourse(@Body() body: Student_CourseDto) {
    try {
      const courseId = body.courseId;
      const studentId = body.studentId;

      const data = await this.student_courseService.findByCondition({
        where: {courseId: courseId, studentId: studentId}
      })

      if(!data) {
        return {
          message: 'Not found'
        }
      }
      await this.student_courseService.delete(data.id)
      return {
        message: 'Success',
        data: data
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed'
      }
    }
  }
}