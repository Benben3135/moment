import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry } from './schemas/entry.schema';
import { CreateJournalEntryDto } from './dto/create-entry.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(JournalEntry.name) private readonly journalModel: Model<JournalEntry>,
  ) {}

  async create(userId: string, createEntryDto: CreateJournalEntryDto) {
    const created = new this.journalModel({
      userId,
      ...createEntryDto,
    });
    return created.save();
  }

  async findUserEntries(userId: string) {
    return this.journalModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}