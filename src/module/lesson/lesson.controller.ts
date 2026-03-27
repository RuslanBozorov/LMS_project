import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LessonService } from './lesson.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateLessonDto, UpdateLessonDto } from './dto/lesson.dto';

@ApiTags('Lesson')
@Controller('lesson')
@UseGuards(AuthGuard, RolesGuard)
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR,UserRole.STUDENT)
  @ApiOperation({ summary: 'ADMIN, MENTOR, STUDENT' })
  @Get('section/:sectionId')
  async getBySection(@Param('sectionId', ParseIntPipe) sectionId: number) {
    return this.lessonService.getBySection(sectionId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @Post('create')
  async create(
    @Body() dto: CreateLessonDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let videoUrl: string = "";

    if (file) {
      videoUrl = await this.cloudinaryService.uploadVideo(file);
    } else if (dto.videoUrl) {
      videoUrl = dto.videoUrl;
    }

    return this.lessonService.create(dto.name, dto.about, videoUrl, dto.sectionId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let videoUrl: string = "";

    if (file) {
      videoUrl = await this.cloudinaryService.uploadVideo(file);
    } else if (dto.videoUrl) {
      videoUrl = dto.videoUrl;
    }

    return this.lessonService.update(id, {
      name: dto.name,
      about: dto.about,
      video: videoUrl
    });
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.lessonService.delete(id);
  }
}
