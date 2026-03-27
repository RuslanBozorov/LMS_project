import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateExamDto } from './dto/exam.dto';

@ApiTags('Exams')
@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: '[ADMIN, MENTOR] Create exam question' })
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateExamDto })
  @Post()
  async create(@Body() dto: CreateExamDto, @Req() req) {
    const creatorId = req.user.id;
    return this.examService.create(dto, creatorId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN)
  @ApiOperation({ summary: '[STUDENT, MENTOR, ADMIN] Get exams by section' })
  @Get('section/:sectionLessonId')
  async getBySection(
    @Param('sectionLessonId', ParseIntPipe) sectionLessonId: number,
    @Req() req: any
  ) {
    const userId = req.user?.id;
    return this.examService.getBySection(sectionLessonId, userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: '[ADMIN, MENTOR] Delete exam question' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const creatorId = req.user.id;
    return this.examService.delete(id, creatorId);
  }
}
