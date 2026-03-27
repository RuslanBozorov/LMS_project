import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AssignCourseDto {
  @ApiProperty({ 
    example: 0, 
    description: 'User ID si (student)' 
  })
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    example: 0, 
    description: 'Course ID si' 
  })
  @Type(() => Number)
  @IsNumber()
  courseId: number;
}
