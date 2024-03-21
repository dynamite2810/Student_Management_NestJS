import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class Student_CourseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  studentId: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  courseId: number;
}