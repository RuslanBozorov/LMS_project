import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [RedisModule],
  controllers: [VerificationController],
  providers: [VerificationService, RedisService],
  exports: [VerificationService, RedisService], 
})
export class VerificationModule {}