import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsPositive, IsEmail } from 'class-validator';

export class UserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  roleId: number;

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

  @Expose()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  phoneNumber: number;

  @Expose()
  @IsNotEmpty()
  gender: string;
}