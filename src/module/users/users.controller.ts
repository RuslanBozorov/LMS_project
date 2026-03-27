import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';


@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({ summary: 'ADMIN' })
    @Get('get-all')
    getAll() {
        return this.userService.getAll()
    }

    @ApiOperation({ summary: 'ADMIN' })
    @Get('get-one/:id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getOne(id)
    }

    @ApiOperation({ summary: 'ADMIN' })
    @ApiConsumes('multipart/form-data')
    @Put('update/:id')
    @UseInterceptors(FileInterceptor('image'))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { fullname?: string; phone?: string; password?: string; role?: string; imageUrl?: string },
        @UploadedFile() file?: Express.Multer.File
    ) {
        return this.userService.update(id, body, file)
    }

    @ApiOperation({ summary: 'ADMIN' })
    @Delete('delete/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
