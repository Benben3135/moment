import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateJournalEntryDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}