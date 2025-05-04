import { UserRole } from '@shared/common';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  fullName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
