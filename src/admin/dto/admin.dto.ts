import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class AdminDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}