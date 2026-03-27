import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { SectionLessonService } from './section-lesson.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateSectionLessonDto } from './dto/section-lesson.dto';

@ApiTags('Section Lesson')
@Controller('section-lesson')
@UseGuards(AuthGuard, RolesGuard)
export class SectionLessonController {
  constructor(private readonly sectionLessonService: SectionLessonService) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('course/:courseId')
  async getByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.sectionLessonService.getByCourse(courseId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @Get('my-course/:courseId')
  async getMyCourseSections(@Param('courseId', ParseIntPipe) courseId: number, @Req() req: any) {
    const userId = req.user.id;
    return this.sectionLessonService.getByCourseForStudent(courseId, userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateSectionLessonDto })
  @Post('create')
  async create(@Body() dto: CreateSectionLessonDto) {
    return this.sectionLessonService.create(dto.name, dto.courseId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.sectionLessonService.delete(id);
  }
}
