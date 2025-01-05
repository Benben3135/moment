// src/meditation/meditation.controller.ts
import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('meditation')
export class MeditationController {
  constructor(private readonly meditationService: MeditationService) {}

  @Post('session')
  async logSession(@Req() req: any, @Body() sessionData: CreateSessionDto) {
    const userId = req.user.id;
    return this.meditationService.logSession(userId, sessionData);
  }

  @Get('stats')
  async getStats(@Req() req: any) {
    const userId = req.user.id;
    return this.meditationService.getUserStats(userId);
  }
}