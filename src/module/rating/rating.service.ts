import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateRatingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async createRating(dto: CreateRatingDto) {
    const user = await this.prisma.users.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User topilmadi');

    const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });
    if (!course) throw new NotFoundException('Course topilmadi');

    return this.prisma.rating.create({
      data: {
        userId: dto.userId,
        courseId: dto.courseId,
        rate: dto.rate,
        comment: dto.comment,
      },
      include: {
        Course: { select: { id: true, name: true } },
        User: { select: { id: true, fullname: true } },
      },
    });
  }

  async getCourseRatings(courseId: number) {
    return this.prisma.rating.findMany({
      where: { courseId },
      include: {
        User: { select: { id: true, fullname: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserRatings(userId: number) {
    return this.prisma.rating.findMany({
      where: { userId },
      include: {
        Course: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAverageRating(courseId: number) {
    const ratings = await this.prisma.rating.findMany({
      where: { courseId },
      select: { rate: true },
    });

    if (ratings.length === 0) return { average: 0, count: 0 };

    const total = ratings.reduce((sum, r) => sum + r.rate, 0);
    return {
      average: total / ratings.length,
      count: ratings.length,
    };
  }

  async delete(id: number) {
    const rating = await this.prisma.rating.findUnique({ where: { id } });
    if (!rating) throw new NotFoundException('Rating topilmadi');

    await this.prisma.rating.delete({ where: { id } });
    return { message: "Rating o'chirildi" };
  }
}
