import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { PurchasedCourseService } from './purchased-course.service';
import { PurchaseCourseDto } from './dto/purchased-course.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('Purchased Course')
@Controller('purchased-course')
@UseGuards(AuthGuard, RolesGuard)
export class PurchasedCourseController {
  constructor(private readonly purchasedCourseService: PurchasedCourseService) {}

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @Post()
  async purchaseCourse(@Body() dto: PurchaseCourseDto) {
    return this.purchasedCourseService.purchaseCourse(dto);
  }

  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @Get('my-purchases')
  async getMyPurchases(@Req() req: any) {
    const userId = req.user.id;
    return this.purchasedCourseService.getUserPurchases(userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Get('user/:userId')
  async getUserPurchases(@Param('userId', ParseIntPipe) userId: number) {
    return this.purchasedCourseService.getUserPurchases(userId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.MENTOR)
  @ApiOperation({ summary: 'ADMIN, MENTOR' })
  @Get('course/:courseId')
  async getCoursePurchases(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.purchasedCourseService.getCoursePurchases(courseId);
  }

  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.purchasedCourseService.delete(id);
  }
}
