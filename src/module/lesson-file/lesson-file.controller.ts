import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LessonFileService } from './lesson-file.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateLessonFileDto } from './dto/lesson-file.dto';

@ApiTags('Lesson File')
@Controller('lesson-file')
export class LessonFileController {
  constructor(
    private readonly lessonFileService: LessonFileService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  async create(
    @Body() dto: CreateLessonFileDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let fileUrl: string = "";

    if (file) {
      fileUrl = await this.cloudinaryService.uploadFile(file);
    } else if (dto.fileUrl) {
      fileUrl = dto.fileUrl;
    }

    return this.lessonFileService.create({
      file: fileUrl,
      note: dto.note,
      lessonId: dto.lessonId
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'STUDENT, MENTOR, ADMIN' })
  @Get('lesson/:lessonId')
  async getByLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.lessonFileService.getByLesson(lessonId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.lessonFileService.delete(id);
  }
}
