import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SubmitHomeworkDto {
  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Homework matni' 
  })
  @IsOptional()
  @IsString()
  text?: string;

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
    description: 'Homework ID si' 
  })
  @Type(() => Number)
  @IsInt()
  homeworkId: number;

  @ApiProperty({ 
    example: 0, 
    description: 'User ID si' 
  })
  @Type(() => Number)
  @IsInt()
  userId: number;
}

export class ReviewHomeworkDto {
  @ApiProperty({ 
    enum: ['APPROVED', 'REJECTED'], 
    example: 'default', 
    description: 'Homework holati' 
  })
  @IsString()
  status: 'APPROVED' | 'REJECTED';

  @ApiPropertyOptional({ 
    example: 'default', 
    description: 'Qayta ko\'rib chiqish sababi' 
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
