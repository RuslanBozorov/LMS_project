import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  providers: [RatingService, PrismaService],
  controllers: [RatingController]
})
export class RatingModule {}
