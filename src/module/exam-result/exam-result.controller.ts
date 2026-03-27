import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { SubmitExamResultDto } from './dto/exam-result.dto';

@ApiTags('Exam Results')
@Controller('exam-results')
@UseGuards(AuthGuard, RolesGuard)
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: '[STUDENT] Submit exam result' })
  @ApiConsumes('application/json')
  @ApiBody({ type: SubmitExamResultDto })
  @Post()
  async submit(@Body() dto: SubmitExamResultDto, @Req() req) {
    const userId = req.user.id;
    return this.examResultService.submit(dto, userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: '[STUDENT] Get my results' })
  @Get('me')
  async getMyResults(@Req() req) {
    const userId = req.user.id;
    return this.examResultService.getMyResults(userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: '[ADMIN, MENTOR] Get results by user' })
  @Get('user/:userId')
  async getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.examResultService.getByUser(userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: '[ADMIN, MENTOR] Get results by section' })
  @Get('section/:sectionLessonId')
  async getBySection(@Param('sectionLessonId', ParseIntPipe) sectionLessonId: number) {
    return this.examResultService.getBySection(sectionLessonId);
  }
}
