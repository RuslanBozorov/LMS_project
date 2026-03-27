import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SubmitExamResultDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  sectionLessonId: number;
}
