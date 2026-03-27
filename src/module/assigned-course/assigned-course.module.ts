import { Module } from '@nestjs/common';
import { AssignedCourseController } from './assigned-course.controller';
import { AssignedCourseService } from './assigned-course.service';
import { PrismaService } from 'src/core/database/prisma.service';

@Module({
  controllers: [AssignedCourseController],
  providers: [AssignedCourseService, PrismaService]
})
export class AssignedCourseModule {}
