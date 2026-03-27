import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class QuestionAnswerService {
  constructor(private prisma: PrismaService) {}

  async answer(data: { questionId: number; userId: number; text: string; file?: string }) {
    return this.prisma.questionAnswer.create({ data });
  }

  async getByQuestion(questionId: number) {
    return this.prisma.questionAnswer.findUnique({
      where: { questionId },
      include: {
        User: { select: { id: true, fullname: true } }
      }
    });
  }

  async delete(id: number) {
    return this.prisma.questionAnswer.delete({ where: { id } });
  }
}
