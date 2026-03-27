import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CourseLevel } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateCourseDto {
    @ApiProperty({})
    @IsString()
    name: string;

    @ApiProperty({})
    @IsString()
    about: string;

    @ApiProperty({})
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty({ 
        type: 'string', 
        format: 'binary', 
        description: 'Course banner rasm (fayl yuklash)',
        required: false 
    })
    @IsOptional()
    banner?: any;

    @ApiProperty({ 
        type: 'string', 
        format: 'binary', 
        description: 'Course intro video (fayl yuklash)',
        required: false 
    })
    @IsOptional()
    introVideo?: any;

    @ApiProperty({ enum: CourseLevel })
    @IsEnum(CourseLevel)
    level: CourseLevel;

    @ApiProperty({})
    @Type(() => Number)
    @IsNumber()
    categoryId: number;

    @ApiProperty({})
    @Type(() => Number)
    @IsNumber()
    mentorId: number;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    published?: boolean;
}
