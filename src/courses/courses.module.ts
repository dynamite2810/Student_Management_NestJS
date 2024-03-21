import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
// import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesController } from './courses.controller';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User])],
  controllers: [CoursesController],
  providers: [CoursesService, UsersService],
  exports: [CoursesService]
})
export class CoursesModule {}
