import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/rating.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.STUDENT)
  @ApiOperation({ summary: 'STUDENT' })
  @Post()
  async createRating(@Body() dto: CreateRatingDto) {
    return this.ratingService.createRating(dto);
  }

  @ApiOperation({ summary: 'PUBLIC' })
  @Get('course/:courseId')
  async getCourseRatings(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.ratingService.getCourseRatings(courseId);
  }

  @ApiOperation({ summary: 'PUBLIC' })
  @Get('user/:userId')
  async getUserRatings(@Param('userId', ParseIntPipe) userId: number) {
    return this.ratingService.getUserRatings(userId);
  }

  @ApiOperation({ summary: 'PUBLIC' })
  @Get('average/:courseId')
  async getAverageRating(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.ratingService.getAverageRating(courseId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'ADMIN' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.ratingService.delete(id);
  }
}
