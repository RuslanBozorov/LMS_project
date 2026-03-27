import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  async create(task: string, file: string | undefined, lessonId: number) {
    return this.prisma.homeWork.create({
      data: { task, file, lessonId }
    });
  }

  async getByLesson(lessonId: number) {
    return this.prisma.homeWork.findUnique({
      where: { lessonId }
    });
  }

  async delete(id: number) {
    return this.prisma.homeWork.delete({ where: { id } });
  }
}
