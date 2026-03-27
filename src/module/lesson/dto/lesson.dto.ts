import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty({ 
    example: 'default', 
    description: 'Lesson nomi' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 'default', 
    description: 'Lesson haqida tavsif' 
  })
  @IsString()
  about: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Lesson video fayli (fayl yuklash). Ixtiyoriy - videoUrl maydonini ishlating.',
    required: false 
  })
  @IsOptional()
  video?: any;

  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Video URL manzili (fayl yuklanmagan bo\'lsa ishlating)' 
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;

  @ApiProperty({ 
    example: 0, 
    description: 'Section ID si' 
  })
  @Type(() => Number)
  @IsInt()
  sectionId: number;
}

export class UpdateLessonDto {
  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Lesson nomi' 
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Lesson haqida tavsif' 
  })
  @IsOptional()
  @IsString()
  about?: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Lesson video fayli (fayl yuklash). Ixtiyoriy - videoUrl maydonini ishlating.',
    required: false 
  })
  @IsOptional()
  video?: any;

  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Video URL manzili (fayl yuklanmagan bo\'lsa ishlating)' 
  })
  @IsOptional()
  @IsString()
  videoUrl?: string;
}
