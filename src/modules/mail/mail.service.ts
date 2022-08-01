import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail({ templateName, email, subject, name, url, code }) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject,
      template: templateName, // `.hbs` extension is appended automatically
      context: {
        name,
        url,
        code,
      },
    });
  }
}
