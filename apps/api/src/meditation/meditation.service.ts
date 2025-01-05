import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeditationSession } from './schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class MeditationService {
  constructor(
    @InjectModel(MeditationSession.name) 
    private readonly sessionModel: Model<MeditationSession>,
  ) {}

  async logSession(userId: string, sessionData: CreateSessionDto) {
    const created = new this.sessionModel({
      userId,
      ...sessionData,
    });
    return created.save();
  }

  async getUserStats(userId: string) {
    const totalSessions = await this.sessionModel.countDocuments({ userId });
    const totalMinutes = await this.sessionModel.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: '$duration' } } }
    ]);

    return {
      totalSessions,
      totalMinutes: totalMinutes[0]?.total || 0,
    };
  }
}