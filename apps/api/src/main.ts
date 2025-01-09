import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['content-type', 'svix-id', 'svix-timestamp', 'svix-signature','authorization'],
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0', () => {
    logger.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap();