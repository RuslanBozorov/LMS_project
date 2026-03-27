import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateQuestionAnswerDto {
  @ApiProperty({ 
    example: 0, 
    description: 'Question ID si' 
  })
  @Type(() => Number)
  @IsInt()
  questionId: number;

  @ApiProperty({ 
    example: 0, 
    description: 'User ID si' 
  })
  @Type(() => Number)
  @IsInt()
  userId: number;

  @ApiProperty({ 
    example: 'default', 
    description: 'Javob matni' 
  })
  @IsString()
  text: string;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary', 
    description: 'Javob fayli (fayl yuklash). Ixtiyoriy - fileUrl maydonini ishlating.',
    required: false 
  })
  @IsOptional()
  file?: any;

  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Fayl URL manzili (fayl yuklanmagan bo\'lsa ishlating)' 
  })
  @IsOptional()
  @IsString()
  fileUrl?: string;
}
