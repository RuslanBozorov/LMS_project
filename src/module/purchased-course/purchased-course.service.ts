import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { PurchaseCourseDto } from './dto/purchased-course.dto';

@Injectable()
export class PurchasedCourseService {
  constructor(private prisma: PrismaService) {}

  async purchaseCourse(dto: PurchaseCourseDto) {
    const user = await this.prisma.users.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User topilmadi');

    const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course topilmadi');

    if (Number(course.price) > dto.amount) {
      throw new NotFoundException('Mablag\' yetarli emas');
    }

    if (Number(course.price) !== dto.amount) {
      throw new NotFoundException('To\'lov summasi kurs narxiga mos kelmadi');
    }

    await this.prisma.purchasedCourse.create({
      data: {
        userId: dto.userId,
        courseId: dto.courseId,
        amount: dto.amount,
        paidVia: dto.paidVia,
      },
    });

    return { message: 'Kurs sotib olindi' };
  }

  async getUserPurchases(userId: number) {
    return this.prisma.purchasedCourse.findMany({
      where: { userId },
      include: {
        Course: { include: { Category: true, Mentor: { select: { id: true, fullname: true } } } },
      },
      orderBy: { purchasedAt: 'desc' },
    });
  }

  async getCoursePurchases(courseId: number) {
    return this.prisma.purchasedCourse.findMany({
      where: { courseId },
      include: {
        User: { select: { id: true, fullname: true, phone: true } },
      },
      orderBy: { purchasedAt: 'desc' },
    });
  }

  async delete(id: number) {
    const purchase = await this.prisma.purchasedCourse.findUnique({ where: { id } });
    if (!purchase) throw new NotFoundException('Purchase topilmadi');

    await this.prisma.purchasedCourse.delete({ where: { id } });
    return { message: "Purchase o'chirildi" };
  }
}
