import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeditationSession, MeditationSessionDocument } from './schemas/meditation-session.schema';
import { CreateSessionDto } from './dto/create-session.dto';
import { MeditationStats } from './interfaces/meditation-stats.interface';

@Injectable()
export class MeditationService {
  constructor(
    @InjectModel(MeditationSession.name)
    private sessionModel: Model<MeditationSessionDocument>
  ) {}

  async logSession(userId: string, sessionData: CreateSessionDto): Promise<MeditationSession> {
    const session = new this.sessionModel({
      ...sessionData,
      userId,
      completedAt: new Date(),
    });
    return session.save();
  }

  async getUserStats(userId: string): Promise<MeditationStats> {
    const [stats] = await this.sessionModel.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMinutes: { $sum: '$duration' },
          averageSessionLength: { $avg: '$duration' },
          longestSession: { $max: '$duration' },
        },
      },
    ]);

    return stats ? {
      totalSessions: stats.totalSessions,
      totalMinutes: stats.totalMinutes,
      averageSessionLength: Math.round(stats.averageSessionLength),
      longestSession: stats.longestSession,
    } : {
      totalSessions: 0,
      totalMinutes: 0,
      averageSessionLength: 0,
      longestSession: 0,
    };
  }
}