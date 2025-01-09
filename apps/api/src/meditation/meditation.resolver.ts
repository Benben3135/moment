import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { MeditationStats } from './models/meditation-stats.model';
import { MeditationService } from './meditation.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => MeditationStats)
@UseGuards(GqlAuthGuard)
export class MeditationResolver {
  constructor(private readonly meditationService: MeditationService) {}

  @Query(() => MeditationStats)
  async meditationStats(@CurrentUser() userId: string) {
    return this.meditationService.getUserStats(userId);
  }
}
