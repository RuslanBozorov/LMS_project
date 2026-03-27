import { IsString, IsOptional, IsNumber, IsInt, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMentorProfileDto {
    @ApiProperty({ 
        example: 'default', 
        description: 'Mentor haqida tavsif' 
    })
    @IsString()
    @IsOptional()
    about?: string;

    @ApiProperty({ 
        example: 'default',
        description: 'Ish joyi yoki kasbi' 
    })
    @IsString()
    @IsOptional()
    job?: string;

    @ApiProperty({ 
        example: 0, 
        description: 'Ish tajribasi yillarda',
        minimum: 0
    })
    @IsInt()
    @Min(0)
    @Type(() => Number)
    experience: number;

    @ApiProperty({ 
        example: 'default',
        description: 'Telegram username' 
    })
    @IsString()
    @IsOptional()
    telegram?: string;

    @ApiProperty({ 
        example: 'default',
        description: 'Instagram username' 
    })
    @IsString()
    @IsOptional()
    instagram?: string;

    @ApiProperty({ 
        example: 'default',
        description: 'LinkedIn username' 
    })
    @IsString()
    @IsOptional()
    linkedin?: string;

    @ApiProperty({ 
        example: 'default',
        description: 'Facebook username' 
    })
    @IsString()
    @IsOptional()
    facebook?: string;

    @ApiProperty({ 
        example: 'default',
        description: 'GitHub username' 
    })
    @IsString()
    @IsOptional()
    github?: string;

    @ApiProperty({ 
        example: 'default',
        description: 'Shaxsiy veb-sayt' 
    })
    @IsString()
    @IsOptional()
    website?: string;

    @ApiProperty({ 
        example: 0,
        description: 'User ID' 
    })
    @IsNumber()
    @Type(() => Number)
    userId: number;
}


export class UpdateMentorProfileDto extends PartialType(CreateMentorProfileDto) {}
