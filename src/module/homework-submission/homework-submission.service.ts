import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { HomeworkSubStatus } from '@prisma/client';

@Injectable()
export class HomeworkSubmissionService {
  constructor(private prisma: PrismaService) {}

  async submit(data: { text?: string; file: string; homeworkId: number; userId: number }) {
    return this.prisma.homeworkSubmission.create({
      data
    });
  }

  async review(id: number, status: HomeworkSubStatus, reason?: string) {
    return this.prisma.homeworkSubmission.update({
      where: { id },
      data: { status, reason }
    });
  }

  async getByHomework(homeworkId: number) {
    return this.prisma.homeworkSubmission.findMany({
      where: { homeworkId },
      include: {
        User: { select: { id: true, fullname: true } }
      }
    });
  }

  async getByUser(userId: number) {
    return this.prisma.homeworkSubmission.findMany({
      where: { userId },
      include: {
        HomeWork: { select: { id: true, task: true } }
      }
    });
  }
}
