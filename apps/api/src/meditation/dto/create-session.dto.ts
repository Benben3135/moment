import { IsNumber, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @IsNumber()
  duration: number;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsObject()
  @IsOptional()
  metrics?: {
    focusScore?: number;
    calmScore?: number;
    completion: boolean;
  };
}