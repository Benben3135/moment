import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class MeditationStats {
  @Field(() => Int)
  totalSessions: number;

  @Field(() => Int)
  totalMinutes: number;
}