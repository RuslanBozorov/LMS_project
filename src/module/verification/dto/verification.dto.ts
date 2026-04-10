import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email manzil',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email manzil',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'OTP kod',
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}
