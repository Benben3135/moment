import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [UsersModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}