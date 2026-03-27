import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLessonFileDto {
  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Lesson fayli (fayl yuklash). Ixtiyoriy - fileUrl maydonini ishlating.',
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

  @ApiPropertyOptional({ 
    example: 'Muhim fayl', 
    description: 'Fayl haqida izoh' 
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ 
    example: 1, 
    description: 'Lesson ID si' 
  })
  @Type(() => Number)
  @IsInt()
  lessonId: number;
}
