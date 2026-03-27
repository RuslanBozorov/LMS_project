import { IsMobilePhone, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ 
    example: 'default', 
  })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('uz-UZ')
  phone: string;

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
    required: false 
  })
  @IsOptional()
  image?: any;

}

export class LoginDto {
  @ApiProperty({ 
    example: 'default', 
  })
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone('uz-UZ')
  phone: string;

  @ApiProperty({ 
    example: 'default', 
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
