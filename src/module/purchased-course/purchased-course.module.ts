import { Module } from '@nestjs/common';
import { PurchasedCourseController } from './purchased-course.controller';
import { PurchasedCourseService } from './purchased-course.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [PurchasedCourseController],
  providers: [PurchasedCourseService, PrismaService]
})
export class PurchasedCourseModule {}
