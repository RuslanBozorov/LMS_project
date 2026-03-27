import { IsNumber, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateRatingDto {
  @ApiProperty({ 
    example: 1, 
    description: 'User ID si' 
  })
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty({ 
    example: 1, 
    description: 'Course ID si' 
  })
  @Type(() => Number)
  @IsNumber()
  courseId: number;

  @ApiProperty({ 
    example: 5, 
    description: 'Reyting (1-5)', 
    minimum: 1, 
    maximum: 5 
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;

  @ApiProperty({ 
    example: 'Juda yaxshi kurs!', 
    description: 'Izoh matni' 
  })
  @IsString()
  comment: string;
}
