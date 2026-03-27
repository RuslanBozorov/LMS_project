import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaidVia } from '@prisma/client';

export class PurchaseCourseDto {
  @ApiProperty({ 
    example: 0, 
    description: 'User ID si' 
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

  @ApiProperty({ 
    example: 0, 
    description: 'To\'lov miqdori' 
  })
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty({ 
    enum: PaidVia, 
    example: 'default', 
    description: 'To\'lov usuli' 
  })
  @IsEnum(PaidVia)
  paidVia: PaidVia;
}
