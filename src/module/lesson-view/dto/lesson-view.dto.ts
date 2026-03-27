import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MarkLessonViewDto {
  @ApiProperty({ 
    example: 0, 
    description: 'Lesson ID si' 
  })
  @Type(() => Number)
  @IsInt()
  lessonId: number;

  @ApiProperty({ 
    example: 0, 
    description: 'User ID si' 
  })
  @Type(() => Number)
  @IsInt()
  userId: number;
}
