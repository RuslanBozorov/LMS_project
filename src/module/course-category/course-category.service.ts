import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class CourseCategoryService {
    constructor(private prisma: PrismaService) { }

    
    async getAll() {
        return this.prisma.courseCategory.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }

    async getOne(id: number) {
        const category = await this.prisma.courseCategory.findUnique({
            where: { id }
        })
        if (!category) throw new NotFoundException("Category topilmadi!")
        return category
    }

    async create(data: { name: string }) {
        return this.prisma.courseCategory.create({
            data
        })
    }

    async update(id: number, data: { name?: string }) {
        const category = await this.prisma.courseCategory.findUnique({ where: { id } })
        if (!category) throw new NotFoundException("Category topilmadi!")

        return this.prisma.courseCategory.update({
            where: { id },
            data
        })
    }

   
    async delete(id: number) {
        const category = await this.prisma.courseCategory.findUnique({ where: { id } })
        if (!category) throw new NotFoundException("Category topilmadi!")

        // Check if there are any courses in this category
        const courseCount = await this.prisma.course.count({
            where: { categoryId: id }
        })

        if (courseCount > 0) {
            throw new NotFoundException(`Kategoriyani o'chirish mumkin emas. Avval ${courseCount} ta kursni o'chiring yoki kategoriyaga bog'liq kurslarni boshqa kategoriyaga o'tkazing.`)
        }

        // Before deleting, clear any LastActivity references that might cause foreign key issues
        // Find all courses in this category and get their related data
        const courses = await this.prisma.course.findMany({
            where: { categoryId: id },
            include: {
                sectionLessons: {
                    include: {
                        lessons: true
                    }
                }
            }
        })

        // Collect all related IDs that need to have their LastActivity references cleared
        const courseIds: number[] = []
        const sectionIds: number[] = []
        const lessonIds: number[] = []

        for (const course of courses) {
            courseIds.push(course.id)
            for (const sectionLesson of course.sectionLessons) {
                sectionIds.push(sectionLesson.id)
                for (const lesson of sectionLesson.lessons) {
                    lessonIds.push(lesson.id)
                }
            }
        }

        // Clear all LastActivity references for affected courses, sections, and lessons
        if (courseIds.length > 0 || sectionIds.length > 0 || lessonIds.length > 0) {
            await this.prisma.lastActivity.updateMany({
                where: {
                    OR: [
                        { courseId: { in: courseIds } },
                        { sectionId: { in: sectionIds } },
                        { lessonId: { in: lessonIds } }
                    ]
                },
                data: {
                    courseId: null,
                    sectionId: null,
                    lessonId: null
                }
            })
        }

        await this.prisma.courseCategory.delete({ where: { id } })
        return { message: "Category o'chirildi" }
    }
}
