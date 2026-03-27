import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(data: { userId: number; courseId: number; text: string; file?: string }) {
    return this.prisma.question.create({ data });
  }

  async getByCourse(courseId: number) {
    return this.prisma.question.findMany({
      where: { courseId },
      include: {
        User: { select: { id: true, fullname: true } }
      }
    });
  }

  async markAsRead(id: number) {
    return this.prisma.question.update({
      where: { id },
      data: { read: true, readAt: new Date() }
    });
  }

  async delete(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }
}
