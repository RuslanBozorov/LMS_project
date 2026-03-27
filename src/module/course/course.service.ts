import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(
        private prisma: PrismaService,
        @Inject(forwardRef(() => CloudinaryService))
        private cloudinary: CloudinaryService
    ) { }

    async getAll() {
        
        return this.prisma.course.findMany({
            where:{published:true},
            include: {
                Category: true,
                Mentor: { select: { id: true, fullname: true, phone: true, image: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

       
    async getAl() {
        
        return this.prisma.course.findMany({
            include: {
                Category: true,
                Mentor: { select: { id: true, fullname: true, phone: true, image: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async getOne(id: number) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                Category: true,
                Mentor: { select: { id: true, fullname: true, phone: true, image: true } }
            }
        });
        if (!course) throw new NotFoundException("Course topilmadi!");
        return course;
    }

  
    async searchCourses(query: string, categoryName?: string) {
        const where: any = {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { about: { contains: query, mode: 'insensitive' } }
            ]
        };

        if (categoryName) {
            const category = await this.prisma.courseCategory.findFirst({
                where: {
                    name: {
                        contains: categoryName,
                        mode: 'insensitive'
                    }
                }
            });
            
            if (category) {
                where.categoryId = category.id;
            }
        }

        return this.prisma.course.findMany({
            where,
            include: {
                Category: true,
                Mentor: { select: { id: true, fullname: true, phone: true, image: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    async createWithFiles(dto: CreateCourseDto, bannerFile?: Express.Multer.File, introVideoFile?: Express.Multer.File) {
        const mentor = await this.prisma.users.findUnique({ where: { id: dto.mentorId } });
        if (!mentor) throw new NotFoundException('Mentor topilmadi');
        if (mentor.role !== 'MENTOR') throw new NotFoundException('Bu foydalanuvchi mentor emas');

        const category = await this.prisma.courseCategory.findUnique({ where: { id: dto.categoryId } });
        if (!category) throw new NotFoundException('Category topilmadi');

        let bannerUrl: string = "";
        let introVideoUrl: string | null = null;

        if (bannerFile) {
            bannerUrl = await this.cloudinary.uploadImage(bannerFile);
        } 

        if (introVideoFile) {
            introVideoUrl = await this.cloudinary.uploadVideo(introVideoFile);
        } 
        const { banner, introVideo, ...rest } = dto;

        return this.prisma.course.create({
            data: {
                ...rest,
                banner: bannerUrl,
                introVideo: introVideoUrl
            },
            include: {
                Category: true,
                Mentor: { select: { id: true, fullname: true, phone: true, image: true } }
            }
        });
    }

    async updateWithFiles(id: number, dto: UpdateCourseDto, bannerFile?: Express.Multer.File, introVideoFile?: Express.Multer.File) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) throw new NotFoundException("Course topilmadi!");

        if (dto.mentorId !== undefined) {
            const mentor = await this.prisma.users.findUnique({ where: { id: dto.mentorId } });
            if (!mentor) throw new NotFoundException('Mentor topilmadi');
            if (mentor.role !== 'MENTOR') throw new NotFoundException('Bu foydalanuvchi mentor emas');
        }

        if (dto.categoryId !== undefined) {
            const category = await this.prisma.courseCategory.findUnique({ where: { id: dto.categoryId } });
            if (!category) throw new NotFoundException('Category topilmadi');
        }

        let bannerUrl: string = course.banner;
        let introVideoUrl: string | null = course.introVideo;

        if (bannerFile) {
            bannerUrl = await this.cloudinary.uploadImage(bannerFile);
        }

        if (introVideoFile) {
            introVideoUrl = await this.cloudinary.uploadVideo(introVideoFile);
        }

        const { banner, introVideo, ...rest } = dto;

        return this.prisma.course.update({
            where: { id },
            data: {
                ...rest,
                banner: bannerUrl,
                introVideo: introVideoUrl
            },
            include: {
                Category: true,
                Mentor: { select: { id: true, fullname: true, phone: true, image: true } }
            }
        });
    }

    async publish(id: number) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) throw new NotFoundException("Course topilmadi!");
        await this.prisma.course.update({
            where: { id },
            data: { published: true }
        });
        return { message: "Course published qilindi" };
    }

    async delete(id: number) {
        const course = await this.prisma.course.findUnique({ where: { id } });
        if (!course) throw new NotFoundException("Course topilmadi!");
        await this.prisma.course.delete({ where: { id } });
        return { message: "Course o'chirildi" };
    }
}
