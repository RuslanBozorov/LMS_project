import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpsertLastActivityDto } from './dto/upsert-last-activity.dto';

@Injectable()
export class LastActivityService {
    constructor(private prisma : PrismaService){}

    async getAll(){
        return this.prisma.lastActivity.findMany({
            include:{
                Course:{select:{id:true,name:true}},
                Section:{select:{id:true,name:true}},
                Lesson:{select:{id:true,name:true}}
            }
        })
    }

    async upsert(userId:number, dto: UpsertLastActivityDto){
        return this.prisma.lastActivity.upsert({
            where:{userId},
            update:{
                ...dto,
                updatedAt:new Date(),
            },
            create:{
                userId,
                ...dto,
            },
            include:{
                Course:true,
                Section:true,
                Lesson:true
            }
        })
    }


    async getByUser(userId:number){
        return this.prisma.lastActivity.findUnique({
            where:{userId},
            include:{
                Course:{select:{id:true,name:true}},
                Section:{select:{id:true,name:true}},
                Lesson:{select:{id:true,name:true}}
            }
        })
    }
}
