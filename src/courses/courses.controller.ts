
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/course.dto';
import { UsersService } from 'src/users/users.service';
import { AdminAuthGuard } from 'src/auth/guard/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/guard/user-auth.guard';

@Controller()
export class CoursesController {
  constructor(protected courseService: CoursesService, protected userService: UsersService) {}

  @UseGuards(UserAuthGuard)
  @Get('/courses')
  async getCourses() {
    try {
      const courses = this.courseService.findAll();
      console.log(this.userService);
      return {
        message: 'Success',
        data: courses
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed'
      }
    }
  }

  @UseGuards(UserAuthGuard)
  @Get('/course/:id')
  async getCourseById(@Param('id') id: number) {
    try {
      const course = this.courseService.findOneById(+id);
      if(!course) {
        return {
          message: 'Course not found'
        }
      }
      return {
        message: 'Success',
        data: course
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed'
      }
    }
  }

  @UseGuards(AdminAuthGuard)  
  @Post('/create-course')
  async createCourse(@Body() body: CourseDto) {
    try {
      const courseId = body.courseId;
      const existed = await this.courseService.findByCondition({
        where: {courseId: courseId}
      })
      if(existed) {
        return {
          message: 'Course is existed'
        }
      }
      await this.courseService.create(body)
      return {
        message: 'Success',
        data: body
      }
    } catch (error) {
      console.log(error);
      return {
        message: 'Failed'
      }
    }
  }

  @UseGuards(AdminAuthGuard)
  @Delete('/delete-course/:id')
  async deleteCourse(@Param('id') id: number) {
    try {
      const course = await this.courseService.findOneById(id);
      if(!course) {
        return {
          message: 'Course not found'
        }
      }
      await this.courseService.delete(+id)
      return {
        message: 'Success'
      }
    } 
    catch (error) {
      console.log(error);
      return {
        message: 'Failed'
      }
    }
  }

  @UseGuards(AdminAuthGuard)
  @Put('/course/update/:id')
  async changeStatusCourse(@Param('id') id: number, @Body() body: any) {
    try {
      const course = await this.courseService.findOneById(id);
      const newCourse = course.update(body);
      return {
        message: 'Success',
        data: newCourse
      }
    } catch (error) {
      return {
        message: 'Failed'
      }
    }
  }

}