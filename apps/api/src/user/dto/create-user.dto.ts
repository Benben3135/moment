// src/user/dto/create-user.dto.ts
import { IsString, IsEmail, IsObject, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  clerkId: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsObject()
  @IsOptional()
  preferences?: {
    notifications: boolean;
    theme: string;
  };
}