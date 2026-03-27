import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { SmsService } from '../services/sms.service';

@Module({
  imports: [RedisModule],
  controllers: [VerificationController],
  providers: [VerificationService, RedisService, SmsService],
  exports: [VerificationService, RedisService], 
})
export class VerificationModule {}