import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JournalEntry } from './models/journal-entry.model';
import { JournalService } from './journal.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => JournalEntry)
@UseGuards(GqlAuthGuard)
export class JournalResolver {
  constructor(private readonly journalService: JournalService) {}

  @Query(() => [JournalEntry])
  async journalEntries(@CurrentUser() userId: string) {
    return this.journalService.findAllByUser(userId);
  }
}