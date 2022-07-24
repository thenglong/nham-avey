import { DynamicModule, Global, Module } from "@nestjs/common"
import { CONFIG_OPTIONS } from "src/common/common.constants"
import { IMailModuleOptions } from "src/mail/mail.interfaces"
import { MailService } from "src/mail/mails.service"

@Module({})
@Global()
export class MailModule {
  static forRoot(options: IMailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    }
  }
}
