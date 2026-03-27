import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

/**
 * Course Category yaratish uchun DTO
 */
export class CreateCourseCategoryDto {
    @ApiProperty({ 
        example: 'default',
        description: 'Kategoriya nomi' 
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}

/**
 * Course Category yangilash uchun DTO
 */
export class UpdateCourseCategoryDto extends PartialType(CreateCourseCategoryDto) {}
