import { Injectable } from '@nestjs/common';
import { SESService } from '@libraries';
import { NotifyUsersDto } from './notifications.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly sourceEmail: string;

  constructor(private readonly sesService: SESService, private readonly configService: ConfigService) {
    this.sourceEmail = this.configService.get<string>('email_source');
  }

  public async notifyUsers(payload: NotifyUsersDto) {
    const { destination } = payload;

    const emails = (typeof destination === 'string') ? [destination] : destination;
    await this.sesService.sendEmail({
      Destination: { ToAddresses: emails }, Source: this.sourceEmail,
      Message: {
        Body: { Text: { Data: 'Conta criada com sucesso.', Charset: 'utf8' } },
        Subject: { Data: 'Equipe Zona Azul - Criação de Conta', Charset: 'utf8' }
      }
    });

    return { statusCode: 200, message: 'email sent' };
  }
}
