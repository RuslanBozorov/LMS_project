import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, UploadedFiles, UseInterceptors, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @ApiOperation({ summary: 'PUBLIC' })
    @Get('all')
    getAll() {
        return this.courseService.getAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN,UserRole.MENTOR)
    @ApiOperation({ summary: 'ADMIN MENTOR' })  
    @Get('get-all')
    getAl() {
        return this.courseService.getAll();
    }
  


    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN,UserRole.MENTOR)
    @ApiOperation({ summary: 'ADMIN MENTOR' })
    @Get('get-one/:id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.getOne(id);
    }


    @ApiOperation({ summary: 'PUBLIC' })
    @Get('search')
    searchCourses(
        @Query('search-course-name') query: string,
        @Query('category') category?: string
    ) {
        return this.courseService.searchCourses(query, category);
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"ADMIN"})
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'banner', maxCount: 1 },
        { name: 'introVideo', maxCount: 1 }
    ]))
    @Post('create')
    create(
        @Body() dto: CreateCourseDto,
        @UploadedFiles() files?: { banner?: Express.Multer.File[], introVideo?: Express.Multer.File[] }
    ) {
        return this.courseService.createWithFiles(
            dto,
            files?.banner?.[0],
            files?.introVideo?.[0]
        );
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"ADMIN"})
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'banner', maxCount: 1 },
        { name: 'introVideo', maxCount: 1 }
    ]))
    @Put('update/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCourseDto,
        @UploadedFiles() files?: { banner?: Express.Multer.File[], introVideo?: Express.Multer.File[] }
    ) {
        return this.courseService.updateWithFiles(
            id,
            dto,
            files?.banner?.[0],
            files?.introVideo?.[0]
        );
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"ADMIN"})
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put('publish/:id')
    publish(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.publish(id);
    }

    @ApiBearerAuth()
    @ApiOperation({summary:"ADMIN"})
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.courseService.delete(id);
    }
}