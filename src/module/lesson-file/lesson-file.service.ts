import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class LessonFileService {
  constructor(private prisma: PrismaService) {}

  async create(data: { file: string; note?: string; lessonId: number }) {
    return this.prisma.lessonFile.create({ data });
  }

  async getByLesson(lessonId: number) {
    return this.prisma.lessonFile.findMany({
      where: { lessonId }
    });
  }

  async delete(id: number) {
    return this.prisma.lessonFile.delete({ where: { id } });
  }
}
