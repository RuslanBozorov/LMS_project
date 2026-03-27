import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @ApiProperty({ 
    required: false, 
    example: 'John Doe',
    description: 'Foydalanuvchi to\'liq ismi'
  })
  @IsString()
  @IsOptional()
  fullname?: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Foydalanuvchi rasmi (fayl yuklash). Ixtiyoriy - imageUrl maydonini ishlating.',
    required: false 
  })
  @IsOptional()
  image?: any;

  @ApiProperty({
    type: String,
    example: 'https://res.cloudinary.com/...',
    description: 'Foydalanuvchi rasmi URL manzili. Ixtiyoriy - image fayli yuklanmagan bo\'lsa ishlating.',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ 
    enum: UserRole, 
    required: false,
    example: 'MENTOR',
    description: 'Foydalanuvchi roli'
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class UserIdDto {
  @ApiProperty({ 
    example: 1,
    description: 'Foydalanuvchi ID si' 
  })
  @IsNumber()
  id: number;
}
