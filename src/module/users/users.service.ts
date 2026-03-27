import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private cloudinaryService: CloudinaryService
    ) { }


    async getAll() {
        return this.prisma.users.findMany({
            select: {
                id: true,
                phone: true,
                role: true,
                fullname: true,
                image: true,
                createdAt: true
            }
        })
    }


    async getOne(id: number) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            select: {
                id: true,
                phone: true,
                role: true,
                fullname: true,
                image: true,
                createdAt: true
            }
        })
        if (!user) throw new NotFoundException("User topilmadi!")
        return user
    }


    async update(
        id: number,
        data: { fullname?: string; phone?: string; password?: string; role?: string; imageUrl?: string },
        file?: Express.Multer.File
    ) {
        const user = await this.prisma.users.findUnique({ where: { id } })
        if (!user) throw new NotFoundException("User topilmadi!")

        if (data.phone && data.phone !== user.phone) {
            const existing = await this.prisma.users.findUnique({
                where: { phone: data.phone }
            })
            if (existing) throw new ConflictException("Bu telefon raqam allaqachon ro'yxatdan o'tgan")
        }

        let imageUrl = user.image
        if (file) {
            imageUrl = await this.cloudinaryService.uploadImage(file)
        } else if (data.imageUrl) {
            imageUrl = data.imageUrl
        }

        let passwordHash = user.password
        if (data.password) {
            passwordHash = await bcrypt.hash(data.password, 10)
        }

        const updateData = {
            fullname: data.fullname || user.fullname,
            phone: data.phone || user.phone,
            password: passwordHash,
            image: imageUrl,
            role: data.role ? data.role as any : user.role
        }

        return this.prisma.users.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                phone: true,
                role: true,
                fullname: true,
                image: true,
                createdAt: true
            }
        })
    }


    async delete(id: number) {
        const user = await this.prisma.users.findUnique({ where: { id } })
        if (!user) throw new NotFoundException("User topilmadi!")

        await this.prisma.users.delete({ where: { id } })
        return { message: "User o'chirildi" }
    }
}
