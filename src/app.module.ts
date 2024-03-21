import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { StudentCoursesModule } from './student_courses/student_courses.module';
import { AdminModule } from './admin/admin.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, CoursesModule, StudentCoursesModule, AdminModule, AuthModule],
})
export class AppModule {}
