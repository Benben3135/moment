// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByClerkId(clerkId: string): Promise<User> {
    return this.userModel.findOne({ clerkId }).exec();
  }

  async update(clerkId: string, updateData: Partial<User>): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ clerkId }, updateData, { new: true })
      .exec();
  }
}