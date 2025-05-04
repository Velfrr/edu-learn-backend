import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../enums';

export class GetUsersDto {
  @IsOptional()
  @IsArray()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];
}
