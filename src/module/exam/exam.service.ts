import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { ExamAnswer } from '@prisma/client';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    question: string;
    variantA: string;
    variantB: string;
    variantC: string;
    variantD: string;
    answer: string;
    sectionLessonId: number;
  }, creatorId: number) {
    return this.prisma.exam.create({
      data: {
        question: data.question,
        variantA: data.variantA,
        variantB: data.variantB,
        variantC: data.variantC,
        variantD: data.variantD,
        answer: data.answer as ExamAnswer,
        sectionLessonId: data.sectionLessonId,
        creatorId
      }
    });
  }

  async getBySection(sectionLessonId: number, userId?: number) {
    if (userId) {
      const section = await this.prisma.sectionLesson.findUnique({
        where: { id: sectionLessonId },
        include: { lessons: { select: { id: true } } }
      });

      if (!section) {
        throw new NotFoundException('Section not found');
      }

      const lessonIds = section.lessons.map(l => l.id);
      const viewedLessons = await this.prisma.lessonView.findMany({
        where: {
          userId,
          lessonId: { in: lessonIds },
          view: true
        }
      });

      if (viewedLessons.length < lessonIds.length) {
        const remaining = lessonIds.length - viewedLessons.length;
        throw new ForbiddenException(`Complete all lessons first. ${remaining} remaining`);
      }
    }

    return this.prisma.exam.findMany({
      where: { sectionLessonId }
    });
  }

  async delete(id: number, creatorId: number) {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    if (exam.creatorId !== creatorId) {
      throw new ForbiddenException('You can only delete your own exams');
    }

    return this.prisma.exam.delete({ where: { id } });
  }
}
