import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'admin@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'default',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'default',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  image?: any;
}

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'default',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
