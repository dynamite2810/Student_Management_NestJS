import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CourseDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  startTime: number;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  endTime: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  date: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  teacherId: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}