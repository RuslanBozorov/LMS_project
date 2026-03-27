import { Module } from '@nestjs/common';
import { HomeworkSubmissionController } from './homework-submission.controller';
import { HomeworkSubmissionService } from './homework-submission.service';
import { PrismaModule } from 'src/core/database/prisma.module';
import { CloudinaryModule } from 'src/core/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [HomeworkSubmissionController],
  providers: [HomeworkSubmissionService]
})
export class HomeworkSubmissionModule {}
