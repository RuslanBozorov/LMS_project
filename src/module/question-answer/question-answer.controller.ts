import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuestionAnswerService } from './question-answer.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateQuestionAnswerDto } from './dto/question-answer.dto';

@ApiTags('Question Answer')
@Controller('question-answer')
export class QuestionAnswerController {
  constructor(
    private readonly questionAnswerService: QuestionAnswerService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('answer')
  async answer(
    @Body() dto: CreateQuestionAnswerDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let fileUrl: string = "";

    if (file) {
      fileUrl = await this.cloudinaryService.uploadFile(file);
    } else if (dto.fileUrl) {
      fileUrl = dto.fileUrl;
    }

    return this.questionAnswerService.answer({
      questionId: dto.questionId,
      userId: dto.userId,
      text: dto.text,
      file: fileUrl
    });
  }

  @ApiOperation({ summary: 'PUBLIC' })
  @Get('question/:questionId')
  async getByQuestion(@Param('questionId', ParseIntPipe) questionId: number) {
    return this.questionAnswerService.getByQuestion(questionId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.questionAnswerService.delete(id);
  }
}
