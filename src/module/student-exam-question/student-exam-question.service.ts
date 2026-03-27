import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { ExamAnswer } from '@prisma/client';

@Injectable()
export class StudentExamQuestionService {
  constructor(private prisma: PrismaService) {}

  async answer(data: {
    examId: number;
    userId: number;
    answer: string;
    sectionLessonId: number;
  }) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: data.examId }
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    const isCorrect = exam.answer === (data.answer as ExamAnswer);

    const existingAnswer = await this.prisma.studentExamQuestion.findFirst({
      where: {
        userId: data.userId,
        examId: data.examId,
        sectionLessonId: data.sectionLessonId
      }
    });

    if (existingAnswer) {
      return this.prisma.studentExamQuestion.update({
        where: { id: existingAnswer.id },
        data: {
          answer: data.answer as ExamAnswer,
          isCorrect: isCorrect
        }
      });
    }

    return this.prisma.studentExamQuestion.create({
      data: {
        examId: data.examId,
        userId: data.userId,
        answer: data.answer as ExamAnswer,
        isCorrect: isCorrect,
        sectionLessonId: data.sectionLessonId
      }
    });
  }

  async getByExam(examId: number) {
    return this.prisma.studentExamQuestion.findMany({
      where: { examId },
      include: {
        User: { select: { id: true, fullname: true } }
      }
    });
  }

  async getByUser(userId: number) {
    return this.prisma.studentExamQuestion.findMany({
      where: { userId },
      include: {
        Exam: { select: { id: true, question: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
