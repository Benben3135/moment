import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateJournalEntryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}