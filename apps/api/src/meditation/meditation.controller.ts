import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MeditationService } from './meditation.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('meditation')
@UseGuards(JwtAuthGuard)
export class MeditationController {
  constructor(private readonly meditationService: MeditationService) {}

  @Post('session')
  async logSession(
    @CurrentUser() userId: string,
    @Body() sessionData: CreateSessionDto
  ) {
    return this.meditationService.logSession(userId, sessionData);
  }

  @Get('stats')
  async getStats(@CurrentUser() userId: string) {
    return this.meditationService.getUserStats(userId);
  }
}