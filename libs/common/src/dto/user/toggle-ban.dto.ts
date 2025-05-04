import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ToggleBanDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsBoolean()
  isBanned: boolean;
}
