import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cloudinaryService: CloudinaryService,
    @InjectRedis() private redis: Redis,
  ) {}

  async register(dto: RegisterDto, file?: Express.Multer.File) {
    const email = dto.email.trim().toLowerCase();
    const verified = await this.redis.get(`verified:${email}`);
    if (!verified) throw new UnauthorizedException('Email tasdiqlanmagan');

    const exists = await this.prisma.users.findUnique({
      where: { email },
    });
    if (exists) throw new ConflictException('Bu email allaqachon mavjud');

    let imageUrl: string | null = null;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.users.create({
      data: {
        email,
        password: hash,
        fullname: dto.fullname,
        image: imageUrl,
      },
    });

    await this.redis.del(`verified:${email}`);
    return this.signToken(user);
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!user) throw new UnauthorizedException('Email yoki parol noto\'g\'ri');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Email yoki parol noto\'g\'ri');

    return this.signToken(user);
  }

  private signToken(user: {
    id: number;
    role: UserRole;
    fullname: string;
    email: string | null;
    image: string | null;
  }) {
    return {
      success: true,
      message: 'Muvaffaqiyatli',
      accessToken: this.jwtService.sign({ id: user.id, role: user.role }),
      user: {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    };
  }
}
