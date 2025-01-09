import { Model } from 'mongoose';
import { UserDocument, User } from '../src/user/schemas/user.schema';

export const createMockUser = (overrides = {}): Partial<User> => ({
  clerkId: 'test_clerk_id',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  preferences: {
    theme: 'light',
    language: 'en',
    notificationPreferences: {
      email: true,
      push: true,
      reminders: false
    },
    meditationDuration: 10,
    meditationReminders: {
      enabled: true,
      time: '09:00',
      days: ['monday', 'wednesday', 'friday']
    }
  },
  isProfileComplete: false,
  interests: [],
  ...overrides
});

export class MockUserModel {
    private data: Partial<User>[];

    constructor(mockData: Partial<User>[] = []) {
        this.data = mockData;
    }
  
    async findOne(query: any): Promise<UserDocument | null> {
        // For username uniqueness check with $ne operator
        if (query.username && query.clerkId && query.clerkId['$ne']) {
            const existingUser = this.data.find(u => 
                u.username === query.username && 
                u.clerkId !== query.clerkId['$ne']
            );
            return existingUser ? this.toUserDocument(existingUser) : null;
        }
      
        // Normal findOne
        const user = this.data.find(u => {
            return Object.entries(query).every(([key, value]) => {
                if (typeof value === 'object' && value !== null && '$ne' in value) {
                    return u[key] !== value['$ne'];
                }
                return u[key] === value;
            });
        });
        return user ? this.toUserDocument(user) : null;
    }
  
    async findOneAndUpdate(query: any, update: any, options: any): Promise<UserDocument | null> {
        const existingUser = await this.findOne(query);
        if (!existingUser) return null;

        const userIndex = this.data.findIndex(u => u.clerkId === existingUser.clerkId);
        if (userIndex === -1) return null;

        // Apply updates
        const updatedUser = {
            ...this.data[userIndex],
            ...update.$set
        };
        
        // Update the data array
        this.data[userIndex] = updatedUser;

        return this.toUserDocument(updatedUser);
    }

    async deleteOne(query: any): Promise<{ deletedCount: number }> {
        const userIndex = this.data.findIndex(u => {
            return Object.entries(query).every(([key, value]) => u[key] === value);
        });
        
        if (userIndex === -1) return { deletedCount: 0 };
        
        this.data.splice(userIndex, 1);
        return { deletedCount: 1 };
    }

    // Helper method to convert a plain object to a UserDocument
    private toUserDocument(user: Partial<User>): UserDocument {
        return {
            ...user,
            toObject: () => ({ ...user }),
            save: () => Promise.resolve(this.toUserDocument(user))
        } as UserDocument;
    }
}