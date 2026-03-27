import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { StudentExamQuestionService } from './student-exam-question.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AnswerExamQuestionDto } from './dto/student-exam-question.dto';

@ApiTags('Student Exam Question')
@Controller('student-exam-question')
@UseGuards(AuthGuard, RolesGuard)
export class StudentExamQuestionController {
  constructor(private readonly studentExamQuestionService: StudentExamQuestionService) {}

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT - o\'z javoblarini ko\'rish' })
  @Get('my-answers')
  async getMyAnswers(@Req() req) {
    const userId = req.user.id;
    return this.studentExamQuestionService.getByUser(userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT - javob berish' })
  @ApiConsumes('application/json')
  @ApiBody({ type: AnswerExamQuestionDto })
  @Post('answer')
  async answer(@Body() dto: AnswerExamQuestionDto, @Req() req) {
    const userId = req.user.id;
    return this.studentExamQuestionService.answer({ ...dto, userId });
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('exam/:examId')
  async getByExam(@Param('examId', ParseIntPipe) examId: number) {
    return this.studentExamQuestionService.getByExam(examId);
  }
}
