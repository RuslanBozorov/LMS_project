import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseCategoryService } from './course-category.service';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateCourseCategoryDto, UpdateCourseCategoryDto } from './dto/course-category.dto';

@ApiTags('Course Category')
@Controller('course-category')
export class CourseCategoryController {
    constructor(private readonly courseCategoryService: CourseCategoryService) { }

    @ApiOperation({ summary: 'PUBLIC' })
    @Get('get-all')
    getAll() {
        return this.courseCategoryService.getAll()
    }

    @ApiOperation({ summary: 'PUBLIC' })
    @Get('get-one/:id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.courseCategoryService.getOne(id)
    }

    @ApiOperation({ summary: 'ADMIN' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('create')
    create(@Body() dto: CreateCourseCategoryDto) {
        return this.courseCategoryService.create(dto)
    }

    @ApiOperation({ summary: 'ADMIN' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put('update/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCourseCategoryDto
    ) {
        return this.courseCategoryService.update(id, dto)
    }

    @ApiOperation({ summary: 'ADMIN' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.courseCategoryService.delete(id)
    }
}
