import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'notifications_queue',
      queueOptions: { durable: true }
    }
  });

  await app.listen();
}
bootstrap();
