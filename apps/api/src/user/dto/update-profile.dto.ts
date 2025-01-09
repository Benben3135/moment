import { IsString, IsOptional, IsEmail, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(10, 500)
  bio?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  @Length(3, 30)
  username?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  avatarUrl?: string;
}
