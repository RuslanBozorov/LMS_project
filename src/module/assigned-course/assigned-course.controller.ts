import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AssignedCourseService } from './assigned-course.service';
import { AssignCourseDto } from './dto/assigned-course.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('Assigned Course')
@Controller('assigned-course')
@UseGuards(AuthGuard, RolesGuard)
export class AssignedCourseController {
  constructor(private readonly assignedCourseService: AssignedCourseService) {}

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Post()
  async assignCourse(@Body() dto: AssignCourseDto) {
    return this.assignedCourseService.assignCourse(dto.userId, dto.courseId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR, UserRole.STUDENT)
  @ApiOperation({ summary: 'ADMIN, MENTOR, STUDENT' })
  @Get('user/:userId')
  async getUserCourses(@Param('userId', ParseIntPipe) userId: number) {
    return this.assignedCourseService.getUserCourses(userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('course/:courseId')
  async getCourseStudents(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.assignedCourseService.getCourseStudents(courseId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.assignedCourseService.delete(id);
  }
}
