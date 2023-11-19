import { DynamicModule, Module } from '@nestjs/common';
import { SESClientConfig } from '@aws-sdk/client-ses';
import { SES_ASYNC_OPTIONS } from './ses.interface';
import { SESService } from './ses.service';

@Module({
  providers: [SESService]
})
export class SESModule {
  static forRoot(options: SESClientConfig): DynamicModule {
    return {
      module: SESModule,
      providers: [
        {
          provide: SESService,
          useClass: SESService,
          useValue: options
        },
      ],
      exports: [SESService]
    }
  }

  static forRootAsync(options: any): DynamicModule {
    return {
      module: SESModule,
      providers: [
        {
          ...options,
          provide: SES_ASYNC_OPTIONS
        },
        {
          provide: SESService,
          useFactory: ((options: SESClientConfig) => { return new SESService(options); }),
          inject: [SES_ASYNC_OPTIONS]
        }
      ],
      exports: [SESService]
    }
  }
}