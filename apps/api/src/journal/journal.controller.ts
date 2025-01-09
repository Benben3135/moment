import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalEntryDto } from './dto/create-journal-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('journal')
@UseGuards(JwtAuthGuard)
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(
    @CurrentUser() userId: string,
    @Body() createEntryDto: CreateJournalEntryDto
  ) {
    return this.journalService.create({
      ...createEntryDto,
      userId
    });
  }

  @Get()
  findAll(@CurrentUser() userId: string) {
    return this.journalService.findAllByUser(userId);
  }
}