import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { EmailService } from 'src/common/email/email.service';
import { generateOtp } from 'src/core/utils/random';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';

@Injectable()
export class VerificationService {
  constructor(
    private redisService: RedisService,
    private emailService: EmailService,
  ) {}

  private getMessage(otp: string) {
    return `LMS loyihasidagi tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`;
  }

  async sendOtp(payload: SendOtpDto) {
    const email = payload.email.trim().toLowerCase();
    const key = 'reg_' + email;
    const session = await this.redisService.get(key);

    if (session) {
      throw new HttpException('Code already sent to user', HttpStatus.BAD_REQUEST);
    }

    const otp = generateOtp();
    await this.redisService.set(key, otp);
    await this.emailService.sendOtpEmail(email, otp);

    return { message: 'Confirmation code sent' };
  }

  async verifyOtp(payload: VerifyOtpDto) {
    const email = payload.email.trim().toLowerCase();
    const key = 'reg_' + email;

    const saved = await this.redisService.get(key);

    if (!saved) {
      throw new HttpException('OTP topilmadi yoki vaqti o\'tgan', HttpStatus.BAD_REQUEST);
    }
    if (saved !== payload.code) {
      throw new HttpException('OTP noto\'g\'ri', HttpStatus.BAD_REQUEST);
    }

    await this.redisService.del(key);
    await this.redisService.set(`verified:${email}`, 'true');

    return { success: true, message: 'Email tasdiqlandi' };
  }
}
