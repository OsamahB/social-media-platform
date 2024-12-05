import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '../consumer.service';
import { EmailService } from '../../email/email.service';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly emailService: EmailService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topics: { topics: ['email-notification'] },
      config: { groupId: 'social-media-platform' },
      onMessage: async ({ value }) => {
        const { to, template, emailData } = JSON.parse(value.toString());
        console.log('Sending email to:', to);
        if (
          !this.emailService.validateRequestEmailData({
            to,
            template,
            emailData,
          })
        ) {
          console.error('Invalid email data');
          return;
        }
        await this.emailService.sendEmail(to, template, emailData);
      },
    });
  }
}
