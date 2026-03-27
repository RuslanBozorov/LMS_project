import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @ApiProperty({ 
    example: 1, 
    description: 'User ID si' 
  })
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({ 
    example: 1, 
    description: 'Course ID si' 
  })
  @Type(() => Number)
  @IsInt()
  courseId: number;

  @ApiProperty({ 
    example: 'Bu haqda savolim bor...', 
    description: 'Savol matni' 
  })
  @IsString()
  text: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Savol fayli (fayl yuklash). Ixtiyoriy - fileUrl maydonini ishlating.',
    required: false 
  })
  @IsOptional()
  file?: any;

  @ApiPropertyOptional({ 
    example: 'https://res.cloudinary.com/.../file.pdf', 
    description: 'Fayl URL manzili (fayl yuklanmagan bo\'lsa ishlating)' 
  })
  @IsOptional()
  @IsString()
  fileUrl?: string;
}
