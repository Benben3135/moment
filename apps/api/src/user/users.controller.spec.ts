// src/user/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { createMockUser } from '../../test/test-utils';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          HttpModule,
          ConfigModule.forRoot()
        ],
        controllers: [UsersController],
        providers: [
          {
            provide: UsersService,
            useValue: {
              findByClerkId: jest.fn(),
              updatePreferences: jest.fn(),
              updateProfile: jest.fn(),
              updateInterests: jest.fn()
            },
          },
          JwtService,
          JwtAuthGuard
        ],
      })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
  
      controller = module.get<UsersController>(UsersController);
      service = module.get<UsersService>(UsersService);
    });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const mockUser = createMockUser();
      jest.spyOn(service, 'findByClerkId').mockResolvedValue(mockUser as any);

      const result = await controller.getProfile('test_clerk_id');
      expect(result).toBe(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      jest.spyOn(service, 'findByClerkId').mockResolvedValue(null);

      await expect(controller.getProfile('non_existent_id'))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('updatePreferences', () => {
    it('should update user preferences', async () => {
      const mockUser = createMockUser();
      const preferences = {
        theme: 'dark',
        language: 'es'
      };

      jest.spyOn(service, 'updatePreferences').mockResolvedValue(mockUser as any);

      const result = await controller.updatePreferences('test_clerk_id', preferences);
      expect(service.updatePreferences).toHaveBeenCalledWith('test_clerk_id', preferences);
      expect(result).toBe(mockUser);
    });
  });
});