import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalService } from './journal.service';
import { JournalResolver } from './journal.resolver';
import { JournalEntry, JournalEntrySchema } from './models/journal-entry.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JournalEntry.name, schema: JournalEntrySchema }
    ])
  ],
  providers: [JournalService, JournalResolver],
  exports: [JournalService]
})
export class JournalModule {}