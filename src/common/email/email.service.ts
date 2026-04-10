import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, login: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      from:
        process.env.MAIL_FROM ??
        process.env.SMTP_USER ??
        process.env.EMAIL,
      subject: 'CRM tizimidan foydalanish uchun login/password',
      template: 'index',
      context: {
        text: `login : ${login}\npassword : ${password}`,
      },
    });
  }

  async sendOtpEmail(email: string, otp: string) {
    await this.mailerService.sendMail({
      to: email,
      from:
        process.env.MAIL_FROM ??
        process.env.SMTP_USER ??
        process.env.EMAIL,
      subject: 'LMS tizimi uchun tasdiqlash kodi',
      text: `Sizning tasdiqlash kodingiz: ${otp}. Kodni hech kimga bermang.`,
    });
  }
}
