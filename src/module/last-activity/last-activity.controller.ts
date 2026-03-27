import { Controller, Get, Patch, Req, UseGuards, Body } from '@nestjs/common';
import { LastActivityService } from './last-activity.service';
import { UpsertLastActivityDto } from './dto/upsert-last-activity.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/role';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('Last Activity')
@ApiBearerAuth()
@Controller('last-activity')
@UseGuards(AuthGuard, RolesGuard)
export class LastActivityController {
    constructor(private readonly lastActivityService: LastActivityService) { }

    @ApiOperation({ summary: 'ADMIN' })
    @Roles(UserRole.ADMIN)
    @Get('all')
    getAll() {
        return this.lastActivityService.getAll();
    }

    @ApiOperation({ summary: 'MENTOR, ASSISTANT, STUDENT' })
    @Roles(UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
    @Patch()
    async upsert(@Req() req, @Body() dto: UpsertLastActivityDto) {
        return this.lastActivityService.upsert(req.user.id, dto);
    }

    @ApiOperation({ summary: 'MENTOR, ASSISTANT, STUDENT' })
    @Roles(UserRole.MENTOR, UserRole.ASSISTANT, UserRole.STUDENT)
    @Get()
    async getMyActivity(@Req() req) {
        return this.lastActivityService.getByUser(req.user.id);
    }
}
