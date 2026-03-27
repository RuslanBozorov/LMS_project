import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { SmsService } from '../services/sms.service';
import { generateOtp } from 'src/core/utils/random';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';

@Injectable()
export class VerificationService {
   constructor(
     private redisService:RedisService,
     private smsService:SmsService
   ){}

   private getMessage(otp:string){
   return `Fixoo platformasidan ro'yxatdan o'tish uchun tasdiqlash kodi: ${otp}. Kodni hech kimga bermang!`
   }

   async sendOtp(payload:SendOtpDto){
    const {phone} = payload
    const key = 'reg_' + phone
    const session = await this.redisService.get(phone)

    if(session){
        throw new HttpException(
            'Code already sent to user',
            HttpStatus.BAD_REQUEST
        )
    }

   const otp = generateOtp()

   await this.redisService.set(key, +otp)

   await this.smsService.sendSMS(this.getMessage(otp), phone)

   return { message: "Confirmation code sent" }
   }


   async verifyOtp(payload: VerifyOtpDto) {
  const { phone, code } = payload
  const key = 'reg_' + phone

  const saved = await this.redisService.get(key)

  if (!saved) {
    throw new HttpException('OTP topilmadi yoki vaqti o\'tgan', HttpStatus.BAD_REQUEST)
  }
  if (saved !== code) {
    throw new HttpException('OTP noto\'g\'ri', HttpStatus.BAD_REQUEST)
  }

  await this.redisService.del(key)
  await this.redisService.set(`verified:${phone}`, 'true')

  return { success: true, message: 'Telefon tasdiqlandi' }
}
}
