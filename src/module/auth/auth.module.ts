import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/core/database/prisma.module';
import type { StringValue } from 'ms';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';

const jwtExpiresIn = (process.env.JWT_EXPIRES_IN ?? '1h') as StringValue;

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET ?? 'dev-secret',
      signOptions: { expiresIn: jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CloudinaryService],
  exports: [JwtModule],
})
export class AuthModule {}
