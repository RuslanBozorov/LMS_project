import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionService } from './question.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateQuestionDto } from './dto/question.dto';

@ApiTags('Question')
@Controller('question')
@UseGuards(AuthGuard, RolesGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  async create(
    @Body() dto: CreateQuestionDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let fileUrl: string = "";

    if (file) {
      fileUrl = await this.cloudinaryService.uploadFile(file);
    } else if (dto.fileUrl) {
      fileUrl = dto.fileUrl;
    }

    return this.questionService.create({
      userId: dto.userId,
      courseId: dto.courseId,
      text: dto.text,
      file: fileUrl
    });
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('course/:courseId')
  async getByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.questionService.getByCourse(courseId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Patch(':id/read')
  async markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.markAsRead(id);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.delete(id);
  }
}
