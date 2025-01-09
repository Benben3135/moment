import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateSessionDto {
  @IsNumber()
  @Min(1)
  @Max(1440) // Max 24 hours in minutes
  duration: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  technique?: string;
}