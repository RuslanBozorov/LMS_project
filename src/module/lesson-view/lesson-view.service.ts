import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class LessonViewService {
  constructor(private prisma: PrismaService) {}

  async markAsView(data: { lessonId: number; userId: number }) {
    return this.prisma.lessonView.upsert({
      where: {
        lessonId_userId: { lessonId: data.lessonId, userId: data.userId }
      },
      update: { view: true },
      create: { lessonId: data.lessonId, userId: data.userId, view: true }
    });
  }

  async getByLesson(lessonId: number) {
    return this.prisma.lessonView.findMany({
      where: { lessonId, view: true },
      include: {
        User: { select: { id: true, fullname: true } }
      }
    });
  }

  async getByUser(userId: number) {
    return this.prisma.lessonView.findMany({
      where: { userId, view: true },
      include: {
        Lesson: { select: { id: true, name: true } }
      }
    });
  }
}
