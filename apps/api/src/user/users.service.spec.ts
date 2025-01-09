import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './schemas/user.schema';
import { MockUserModel, createMockUser } from '../../test/test-utils';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: MockUserModel;

  beforeEach(async () => {
    mockUserModel = new MockUserModel([createMockUser()]);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findByClerkId', () => {
    it('should find a user by clerk ID', async () => {
      const result = await service.findByClerkId('test_clerk_id');
      expect(result).toBeDefined();
      expect(result?.clerkId).toBe('test_clerk_id');
    });

    it('should return null for non-existent clerk ID', async () => {
      const result = await service.findByClerkId('non_existent_id');
      expect(result).toBeNull();
    });
  });

  describe('updatePreferences', () => {
    it('should update user preferences', async () => {
      const newPreferences: UpdatePreferencesDto = {
        theme: 'dark', // Now explicitly 'dark' | 'light'
        language: 'es',
        notificationPreferences: {
          email: true,
          push: false
        }
      };

      const result = await service.updatePreferences('test_clerk_id', newPreferences);
      expect(result).toBeDefined();
      expect(result.preferences.theme).toBe('dark');
      expect(result.preferences.language).toBe('es');
    });

    it('should throw NotFoundException for non-existent user', async () => {
      const newPreferences: UpdatePreferencesDto = { 
        theme: 'dark' 
      };
      
      await expect(
        service.updatePreferences('non_existent_id', newPreferences)
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should throw ConflictException for duplicate username', async () => {
      const mockUsers = [
        createMockUser({ clerkId: 'user1', username: 'existing' }),
        createMockUser({ clerkId: 'user2', username: 'taken' })
      ];
      
      const userModel = new MockUserModel(mockUsers);
      const service = new UsersService(userModel as any);
  
      await expect(
        service.updateProfile('user1', { username: 'taken' })
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('checkProfileCompletion', () => {
    it('should correctly determine if profile is complete', () => {
      const completeUser = createMockUser({
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        preferences: {
          language: 'en',
          notificationPreferences: { email: true },
          meditationDuration: 10,
          meditationReminders: { enabled: true }
        }
      });

      const result = service['checkProfileCompletion'](completeUser as any);
      expect(result).toBe(true);
    });

    it('should return false for incomplete profile', () => {
      const incompleteUser = createMockUser({
        email: null,
        preferences: {}
      });

      const result = service['checkProfileCompletion'](incompleteUser as any);
      expect(result).toBe(false);
    });
  });
});