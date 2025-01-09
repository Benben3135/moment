import { 
  Controller, 
  Get, 
  Put, 
  Delete, 
  Body, 
  HttpCode, 
  HttpStatus, 
  NotFoundException, 
  UseGuards
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() clerkId: string) {
    console.log("Attempting to get profile for clerkId:", clerkId);
    const user = await this.usersService.findByClerkId(clerkId);
    console.log("Found user:", user);
    
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return user;
  }

  @Put('profile')
  async updateProfile(
    @CurrentUser() clerkId: string,
    @Body() updateData: UpdateProfileDto
  ) {
    return this.usersService.updateProfile(clerkId, updateData);
  }

  @Put('preferences')
  async updatePreferences(
    @CurrentUser() clerkId: string,
    @Body() preferences: Record<string, string>
  ) {
    return this.usersService.updatePreferences(clerkId, preferences);
  }

  @Put('interests')
  async updateInterests(
    @CurrentUser() clerkId: string,
    @Body() { interests }: { interests: string[] }
  ) {
    return this.usersService.updateInterests(clerkId, interests);
  }

  @Delete('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProfile(@CurrentUser() clerkId: string) {
    await this.usersService.deleteUser(clerkId);
  }
}