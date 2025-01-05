import { IsString, IsArray, IsObject, IsOptional } from 'class-validator';

export class CreateJournalEntryDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsObject()
  @IsOptional()
  metadata?: {
    mood: string;
    energyLevel: number;
    location?: string;
  };
}