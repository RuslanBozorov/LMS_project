// dto/upsert-last-activity.dto.ts
import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpsertLastActivityDto {
  @ApiPropertyOptional({ 
    example: 1, 
    description: 'Course ID si' 
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  courseId?: number;

  @ApiPropertyOptional({ 
    example: 1, 
    description: 'Section ID si' 
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  sectionId?: number;

  @ApiPropertyOptional({ 
    example: 1, 
    description: 'Lesson ID si' 
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  lessonId?: number;
}
