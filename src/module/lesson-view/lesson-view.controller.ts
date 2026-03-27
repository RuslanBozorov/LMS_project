import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LessonViewService } from './lesson-view.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { MarkLessonViewDto } from './dto/lesson-view.dto';

@ApiTags('Lesson View')
@Controller('lesson-view')
export class LessonViewController {
  constructor(private readonly lessonViewService: LessonViewService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @ApiConsumes('application/json')
  @ApiBody({ type: MarkLessonViewDto })
  @Post('view')
  async markAsView(@Body() dto: MarkLessonViewDto) {
    return this.lessonViewService.markAsView(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('lesson/:lessonId')
  async getByLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    return this.lessonViewService.getByLesson(lessonId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('user/:userId')
  async getByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.lessonViewService.getByUser(userId);
  }
}
