import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateHomeworkDto {
  @ApiProperty({ 
    example: 'default', 
    description: 'Homework vazifasi' 
  })
  @IsString()
  task: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Homework fayli (fayl yuklash). Ixtiyoriy - fileUrl maydonini ishlating.',
    required: false 
  })
  @IsOptional()
  file?: any;

  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Homework fayli URL manzili (fayl yuklanmagan bo\'lsa ishlating)' 
  })
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiProperty({ 
    example: 0, 
    description: 'Lesson ID si' 
  })
  @Type(() => Number)
  @IsInt()
  lessonId: number;
}
