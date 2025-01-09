import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class JournalEntry {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  content: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Field()
  @Prop({ required: true })
  userId: string;

  @Field()
  @Prop()
  createdAt: Date;
}

export type JournalEntryDocument = JournalEntry & Document;
export const JournalEntrySchema = SchemaFactory.createForClass(JournalEntry);