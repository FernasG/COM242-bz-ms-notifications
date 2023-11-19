import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyUsersDto } from './notifications.interface';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @MessagePattern('notify')
  public async notifyUsers(@Payload() payload: NotifyUsersDto) {
    return this.notificationsService.notifyUsers(payload);
  }
}
