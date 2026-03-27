import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomeworkSubmissionService } from './homework-submission.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { SubmitHomeworkDto, ReviewHomeworkDto } from './dto/homework-submission.dto';

@ApiTags('Homework Submission')
@Controller('homework-submission')
@UseGuards(AuthGuard, RolesGuard)
export class HomeworkSubmissionController {
  constructor(
    private readonly homeworkSubmissionService: HomeworkSubmissionService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('submit')
  async submit(
    @Body() dto: SubmitHomeworkDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let fileUrl: string = "";

    if (file) {
      fileUrl = await this.cloudinaryService.uploadFile(file);
    } else if (dto.fileUrl) {
      fileUrl = dto.fileUrl;
    }

    return this.homeworkSubmissionService.submit({
      text: dto.text,
      file: fileUrl,
      homeworkId: dto.homeworkId,
      userId: dto.userId
    });
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @ApiConsumes('application/json')
  @Put(':id/review')
  async review(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReviewHomeworkDto
  ) {
    return this.homeworkSubmissionService.review(id, dto.status, dto.reason);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('homework/:homeworkId')
  async getByHomework(@Param('homeworkId', ParseIntPipe) homeworkId: number) {
    return this.homeworkSubmissionService.getByHomework(homeworkId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @Get('user/:userId')
  async getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.homeworkSubmissionService.getByUser(userId);
  }
}
