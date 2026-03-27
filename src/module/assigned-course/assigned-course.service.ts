import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class AssignedCourseService {
  constructor(private prisma: PrismaService) {}

  async assignCourse(userId: number, courseId: number) {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User topilmadi');

    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course topilmadi');

    return this.prisma.assignedCourse.create({
      data: {
        userId,
        courseId,
      },
      include: {
        Course: { include: { Category: true } },
        User: { select: { id: true, fullname: true, phone: true } },
      },
    });
  }

  async getUserCourses(userId: number) {
    return this.prisma.assignedCourse.findMany({
      where: { userId },
      include: {
        Course: { include: { Category: true, Mentor: { select: { id: true, fullname: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCourseStudents(courseId: number) {
    return this.prisma.assignedCourse.findMany({
      where: { courseId },
      include: {
        User: { select: { id: true, fullname: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: number) {
    const assigned = await this.prisma.assignedCourse.findUnique({ where: { id } });
    if (!assigned) throw new NotFoundException('Assigned course topilmadi');

    await this.prisma.assignedCourse.delete({ where: { id } });
    return { message: "Course o'chirildi" };
  }
}
