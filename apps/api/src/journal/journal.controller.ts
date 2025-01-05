// src/journal/journal.controller.ts
import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalEntryDto } from './dto/create-entry.dto';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  async createEntry(@Req() req: any, @Body() createEntryDto: CreateJournalEntryDto) {
    const userId = req.user.id;
    return this.journalService.create(userId, createEntryDto);
  }

  @Get()
  async getUserEntries(@Req() req: any) {
    const userId = req.user.id;
    return this.journalService.findUserEntries(userId);
  }
}