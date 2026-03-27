import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiTags, ApiConsumes, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'PUBLIC' })
  @ApiResponse({ status: 201, description: 'Register successfuly' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: { type: 'string', example: 'string' },
        password: { type: 'string', example: 'string' },
        fullname: { type: 'string', example: 'string' },
        image: { type: 'string', format: 'binary' },
      },
      required: ['phone', 'password', 'fullname'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  register(
    @Body() dto: RegisterDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authService.register(dto, file);
  }

  @Post('login')
  @ApiOperation({ summary: 'PUBLIC' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli kirish' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
