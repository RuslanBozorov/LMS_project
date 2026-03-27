import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ 
    example: 'default',
    description: 'Telefon raqam'
  })
  @IsString()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string
}

export class VerifyOtpDto {
  @ApiProperty({ 
    example: 'default',
    description: 'Telefon raqam'
  })
  @IsString()
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string

  @ApiProperty({ 
    example: 'default',
    description: 'OTP kod'
  })
  @IsString()
  @IsNotEmpty()
  code: string
}
