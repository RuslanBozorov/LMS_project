import { Module } from '@nestjs/common';
import { MentorProfileController } from './mentor-profile.controller';
import { MentorProfileService } from './mentor-profile.service';
import { PrismaModule } from 'src/core/database/prisma.module';
import { CloudinaryModule } from 'src/core/cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [MentorProfileController],
  providers: [MentorProfileService]
})
export class MentorProfileModule {}
