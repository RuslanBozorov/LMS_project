import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { MentorProfileService } from './mentor-profile.service';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';
import { CreateMentorProfileDto, UpdateMentorProfileDto } from './dto/mentor.dto';

@ApiTags('Mentor Profile')
@Controller('mentor-profile')
export class MentorProfileController {
    constructor(
        private readonly mentorProfileService: MentorProfileService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @ApiOperation({ summary: 'PUBLIC' })
    @Get('get-all')
    getAll() {
        return this.mentorProfileService.getAll()
    }

    @ApiOperation({ summary: 'PUBLIC' })
    @Get('get-one/:id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.mentorProfileService.getOne(id)
    }

    @ApiOperation({ summary: 'PUBLIC' })
    @Get('get-by-user/:userId')
    getByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.mentorProfileService.getByUserId(userId)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'ADMIN' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar'))
    @Post('create')
    create(
        @Body() dto: CreateMentorProfileDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        return this.mentorProfileService.create(dto, file)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @ApiOperation({ summary: 'ADMIN' })
    @Roles(UserRole.ADMIN, UserRole.MENTOR)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('avatar'))
    @Put('update/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateMentorProfileDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        return this.mentorProfileService.update(id, dto, file)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'ADMIN' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.mentorProfileService.delete(id)
    }
}
