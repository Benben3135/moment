// src/journal/journal.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { JournalEntry, JournalEntrySchema } from './schemas/entry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JournalEntry.name, schema: JournalEntrySchema },
    ]),
  ],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}