import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getBySection(sectionId: number) {
    return this.prisma.lesson.findMany({
      where: { sectionId },
      include: {
        lessonFiles: { select: { id: true, file: true } },
        homeWork: { select: { id: true, task: true } }
      }
    });
  }

  async create(name: string, about: string, video: string, sectionId: number) {
    return this.prisma.lesson.create({
      data: { name, about, video, sectionId }
    });
  }

  async update(id: number, data: { name?: string; about?: string; video?: string }) {
    return this.prisma.lesson.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
