import { IsInt, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ExamAnswer } from '@prisma/client';

export class CreateExamDto {
  @ApiProperty({ example: 'Question text' })
  @IsString()
  question: string;

  @ApiProperty({ example: 'Option A' })
  @IsString()
  variantA: string;

  @ApiProperty({ example: 'Option B' })
  @IsString()
  variantB: string;

  @ApiProperty({ example: 'Option C' })
  @IsString()
  variantC: string;

  @ApiProperty({ example: 'Option D' })
  @IsString()
  variantD: string;

  @ApiProperty({ enum: ExamAnswer, example: ExamAnswer.variantA })
  @IsEnum(ExamAnswer)
  answer: ExamAnswer;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  sectionLessonId: number;
}
