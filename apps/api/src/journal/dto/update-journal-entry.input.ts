import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray } from 'class-validator';

@InputType()
export class UpdateJournalEntryInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  tags?: string[];
}