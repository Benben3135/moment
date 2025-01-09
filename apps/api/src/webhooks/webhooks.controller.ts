import { Controller, Post, Body, Headers, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { Webhook } from 'svix';

@Controller('webhooks')
export class WebhooksController {
  private readonly logger = new Logger(WebhooksController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post('clerk')
  async handleWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() payload: any
  ) {
    try {
      this.logger.log(`Webhook received: ${JSON.stringify(payload)}`);

      switch (payload.type) {
        case 'user.created':
          return await this.handleUserCreated(payload.data);
        
        case 'user.updated':
          return await this.handleUserUpdated(payload.data);
        
        case 'user.deleted':
          return await this.handleUserDeleted(payload.data);
        
        default:
          this.logger.warn(`Unhandled webhook type: ${payload.type}`);
          return { received: true, type: payload.type };
      }
    } catch (error) {
      this.logger.error(`Error processing webhook: ${error.message}`);
      throw new HttpException(
        'Error processing webhook',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async handleUserCreated(data: any) {
    const userData = {
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
    };

    this.logger.log(`Creating user with data: ${JSON.stringify(userData)}`);
    const newUser = await this.usersService.createUser(userData);
    this.logger.log(`User created successfully: ${newUser._id.toString()}`);

    return { success: true, userId: newUser._id.toString(), event: 'user.created' };
  }

  private async handleUserUpdated(data: any) {
    const userData = {
      email: data.email_addresses?.[0]?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
    };

    const updatedUser = await this.usersService.updateUser(data.id, userData);
    this.logger.log(`User updated successfully: ${updatedUser._id.toString()}`);

    return { success: true, userId: updatedUser._id.toString(), event: 'user.updated' };
  }

  private async handleUserDeleted(data: any) {
    await this.usersService.deleteUser(data.id);
    this.logger.log(`User deleted successfully: ${data.id}`);

    return { success: true, clerkId: data.id, event: 'user.deleted' };
  }
}