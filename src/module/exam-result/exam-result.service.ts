import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class ExamResultService {
  constructor(private prisma: PrismaService) {}

  async submit(data: { sectionLessonId: number }, userId: number) {
    const studentAnswers = await this.prisma.studentExamQuestion.findMany({
      where: {
        userId,
        sectionLessonId: data.sectionLessonId
      }
    });

    if (studentAnswers.length === 0) {
      throw new NotFoundException('No answers found for this exam');
    }

    const totalQuestions = studentAnswers.length;
    const corrects = studentAnswers.filter(a => a.isCorrect).length;
    const wrongs = totalQuestions - corrects;
    const percentage = (corrects / totalQuestions) * 100;
    const passed = percentage >= 70;

    return this.prisma.$transaction(async (tx) => {
      return tx.examResult.upsert({
        where: {
          userId_sectionLessonId: {
            userId,
            sectionLessonId: data.sectionLessonId
          }
        },
        update: {
          passed,
          corrects,
          wrongs
        },
        create: {
          sectionLessonId: data.sectionLessonId,
          userId,
          passed,
          corrects,
          wrongs
        },
        include: {
          Section: { select: { id: true, name: true } }
        }
      });
    });
  }

  async getMyResults(userId: number) {
    return this.prisma.examResult.findMany({
      where: { userId },
      include: {
        Section: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getByUser(userId: number) {
    return this.prisma.examResult.findMany({
      where: { userId },
      include: {
        Section: { select: { id: true, name: true } },
        User: { select: { id: true, fullname: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getBySection(sectionLessonId: number) {
    return this.prisma.examResult.findMany({
      where: { sectionLessonId },
      include: {
        User: { select: { id: true, fullname: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
