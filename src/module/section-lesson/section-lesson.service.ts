import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class SectionLessonService {
  constructor(private prisma: PrismaService) {}

  async getByCourse(courseId: number) {
    return this.prisma.sectionLesson.findMany({
      where: { courseId },
      include: {
        lessons: { select: { id: true, name: true } }
      }
    });
  }

  async create(name: string, courseId: number) {
    return this.prisma.sectionLesson.create({
      data: { name, courseId }
    });
  }

  async delete(id: number) {
    return this.prisma.sectionLesson.delete({ where: { id } });
  }
}
