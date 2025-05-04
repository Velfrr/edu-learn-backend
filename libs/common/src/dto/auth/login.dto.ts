import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ format: 'email', example: 'example@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: 'yourpassword' })
  @IsString()
  @MinLength(6)
  password: string;
}
