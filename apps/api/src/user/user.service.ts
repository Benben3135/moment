import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema'; // Add User here
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async createUser(userData: {
    clerkId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    this.logger.log(`Creating user with clerkId: ${userData.clerkId}`);
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async updateUser(clerkId: string, userData: {
    email?: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    this.logger.log(`Updating user with clerkId: ${clerkId}`);
    const updatedUser = await this.userModel.findOneAndUpdate(
      { clerkId },
      { $set: userData },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with clerkId ${clerkId} not found`);
    }

    return updatedUser;
  }

  async deleteUser(clerkId: string): Promise<void> {
    this.logger.log(`Deleting user with clerkId: ${clerkId}`);
    const result = await this.userModel.deleteOne({ clerkId });
    
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with clerkId ${clerkId} not found`);
    }
  }

  async findByClerkId(clerkId: string) {
    console.log("Looking up user with clerkId:", clerkId);
    return await this.userModel.findOne({ clerkId });
  }


  async updateProfile(clerkId: string, updateData: UpdateProfileDto): Promise<User> {
    this.logger.log(`Updating profile for user ${clerkId}`);

    // Check username uniqueness if being updated
    if (updateData.username) {
      const existingUser = await this.userModel.findOne({
        username: updateData.username,
        clerkId: { $ne: clerkId }
      });
      if (existingUser) {
        throw new ConflictException('Username already taken');
      }
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { clerkId },
      {
        $set: {
          ...updateData,
          lastLoginAt: new Date(),
          isProfileComplete: this.checkProfileComplete({
            ...await this.findByClerkId(clerkId),
            ...updateData
          })
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with clerkId ${clerkId} not found`);
    }

    return updatedUser;
  }

  async updatePreferences(clerkId: string, preferences: UpdatePreferencesDto) {
    const user = await this.userModel.findOne({ clerkId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Merge existing preferences with new ones
    const updatedPreferences = {
      ...user.preferences,
      ...preferences
    };

    // Check if profile is complete after updating preferences
    const isProfileComplete = this.checkProfileCompletion({
      ...user.toObject(),
      preferences: updatedPreferences
    });

    const updatedUser = await this.userModel.findOneAndUpdate(
      { clerkId },
      { 
        $set: { 
          preferences: updatedPreferences,
          isProfileComplete
        }
      },
      { new: true }
    );

    return updatedUser;
  }

  private checkProfileCompletion(user: User): boolean {
    // Define required fields for a complete profile
    const requiredPreferences = [
      user.preferences?.language,
      user.preferences?.notificationPreferences?.email !== undefined,
      user.preferences?.meditationDuration,
      user.preferences?.meditationReminders?.enabled !== undefined
    ];

    const requiredFields = [
      user.email,
      user.firstName,
      user.lastName,
      // Add any other required fields
    ];

    // Check if all required fields are present
    const allFieldsPresent = [...requiredFields, ...requiredPreferences].every(field => field);

    return allFieldsPresent;
  }

  async updateInterests(clerkId: string, interests: string[]): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { clerkId },
      { $set: { interests } },
      { new: true }
    );

    if (!user) {
      throw new NotFoundException(`User with clerkId ${clerkId} not found`);
    }

    return user;
  }

  private checkProfileComplete(user: Partial<UserDocument>): boolean {
    const requiredFields = ['firstName', 'lastName', 'email', 'username'];
    return requiredFields.every(field => !!user[field]);
  }
}