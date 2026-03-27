import { IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExamAnswer } from '@prisma/client';
import { Type } from 'class-transformer';

export class AnswerExamQuestionDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  examId: number;

  @ApiProperty({ enum: ExamAnswer, example: ExamAnswer.variantA })
  @IsEnum(ExamAnswer)
  answer: ExamAnswer;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  sectionLessonId: number;
}
