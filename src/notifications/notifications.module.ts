import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { SESModule } from '@libraries';

@Module({
  imports: [
    SESModule.forRootAsync({
      useFactory: ((configService: ConfigService) => configService.get('aws')),
      inject: [ConfigService]
    })
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule { }
