import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSectionLessonDto {
  @ApiProperty({ 
    example: 'Kirish', 
    description: 'Section nomi' 
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    example: 1, 
    description: 'Course ID si' 
  })
  @Type(() => Number)
  @IsInt()
  courseId: number;
}
