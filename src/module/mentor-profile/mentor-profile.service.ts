import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';

@Injectable()
export class MentorProfileService {
    constructor(
        private prisma: PrismaService,
        private cloudinary: CloudinaryService
    ) { }

    
    async getAll() {
        return this.prisma.mentorProfile.findMany({
            include: {
                User: {
                    select: {
                        id: true,
                        phone: true,
                        fullname: true,
                        image: true,
                        role: true
                    }
                }
            }
        })
    }

   
    async getOne(id: number) {
        const profile = await this.prisma.mentorProfile.findUnique({
            where: { id },
            include: {
                User: {
                    select: {
                        id: true,
                        phone: true,
                        fullname: true,
                        image: true,
                        role: true
                    }
                }
            }
        })
        if (!profile) throw new NotFoundException("Mentor profile topilmadi!")
        return profile
    }

   
    async getByUserId(userId: number) {
        const profile = await this.prisma.mentorProfile.findUnique({
            where: { userId },
            include: {
                User: {
                    select: {
                        id: true,
                        phone: true,
                        fullname: true,
                        image: true,
                        role: true
                    }
                }
            }
        })
        if (!profile) throw new NotFoundException("Mentor profile topilmadi!")
        return profile
    }

   
    async create(
        data: {
            about?: string;
            job?: string;
            experience: number;
            telegram?: string;
            instagram?: string;
            linkedin?: string;
            facebook?: string;
            github?: string;
            website?: string;
            userId: number;
        },
        file?: Express.Multer.File
    ) {
        let avatarUrl: string = "";

        if (file) {
            avatarUrl = await this.cloudinary.uploadImage(file);
        }

        // Update user role to MENTOR
        await this.prisma.users.update({
            where: { id: data.userId },
            data: { role: 'MENTOR' }
        });

        return this.prisma.mentorProfile.create({
            data: {
                ...data,
                avatar: avatarUrl
            },
            include: {
                User: {
                    select: {
                        id: true,
                        phone: true,
                        fullname: true,
                        image: true,
                        role: true
                    }
                }
            }
        })
    }

   
    async update(
        id: number,
        data: {
            about?: string;
            job?: string;
            experience?: number;
            telegram?: string;
            instagram?: string;
            linkedin?: string;
            facebook?: string;
            github?: string;
            website?: string;
        },
        file?: Express.Multer.File
    ) {
        const profile = await this.prisma.mentorProfile.findUnique({ where: { id } })
        if (!profile) throw new NotFoundException("Mentor profile topilmadi!")

        let avatarUrl: string = profile.avatar || "";

        if (file) {
            avatarUrl = await this.cloudinary.uploadImage(file);
        }

        return this.prisma.mentorProfile.update({
            where: { id },
            data: {
                ...data,
                avatar: avatarUrl
            },
            include: {
                User: {
                    select: {
                        id: true,
                        phone: true,
                        fullname: true,
                        image: true,
                        role: true
                    }
                }
            }
        })
    }

   
    async delete(id: number) {
        const profile = await this.prisma.mentorProfile.findUnique({ where: { id } })
        if (!profile) throw new NotFoundException("Mentor profile topilmadi!")

        await this.prisma.mentorProfile.delete({ where: { id } })
        return { message: "Mentor profile o'chirildi" }
    }
}
