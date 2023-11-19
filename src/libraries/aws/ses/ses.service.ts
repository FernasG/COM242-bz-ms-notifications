import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand, SendEmailCommandInput, SendEmailCommandOutput } from '@aws-sdk/client-ses'

@Injectable()
export class SESService extends SESClient {
  public async sendEmail(input: SendEmailCommandInput): Promise<SendEmailCommandOutput> {
    return this.handleError(this.send(new SendEmailCommand(input)), 'sendEmail');
  }

  private async handleError<T>(promise: Promise<T>, method: string) {
    return promise.catch(({ message }) => {
      console.log(JSON.stringify({ error: message, module: 'SESModule', service: 'SESService', method }));
      return null;
    });
  }
}