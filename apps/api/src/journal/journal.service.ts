import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JournalEntry, JournalEntryDocument } from './models/journal-entry.model';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { UpdateJournalEntryDto } from './dto/update-journal-entry.dto';

@Injectable()
export class JournalService {
  constructor(
    @InjectModel(JournalEntry.name)
    private journalModel: Model<JournalEntryDocument>
  ) {}

  async create(data: CreateJournalEntryDto & { userId: string }): Promise<JournalEntry> {
    const createdEntry = new this.journalModel({
      ...data,
      createdAt: new Date(),
    });
    
    return createdEntry.save();
  }

  async findAllByUser(userId: string): Promise<JournalEntry[]> {
    return this.journalModel.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string, userId: string): Promise<JournalEntry> {
    const entry = await this.journalModel.findOne({ _id: id, userId }).exec();
    
    if (!entry) {
      throw new NotFoundException(`Journal entry with ID ${id} not found`);
    }
    
    return entry;
  }

  async update(
    id: string, 
    userId: string, 
    data: UpdateJournalEntryDto
  ): Promise<JournalEntry> {
    const updatedEntry = await this.journalModel
      .findOneAndUpdate(
        { _id: id, userId },
        { $set: data },
        { new: true }
      )
      .exec();
      
    if (!updatedEntry) {
      throw new NotFoundException(`Journal entry with ID ${id} not found`);
    }
    
    return updatedEntry;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.journalModel
      .deleteOne({ _id: id, userId })
      .exec();
      
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Journal entry with ID ${id} not found`);
    }
    
    return true;
  }
}
