import { Body, Controller, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';

@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
    constructor(private readonly verificationService : VerificationService){}

    @Post('send')
    @ApiOperation({ summary: 'PUBLIC' })
    @ApiResponse({ status: 200, description: 'OTP muvaffaqiyatli yuborildi' })
    sendOtp(@Body() body:SendOtpDto){
        return this.verificationService.sendOtp(body)
    }

    @Post('verify')
    @ApiOperation({ summary: 'PUBLIC' })
    @ApiResponse({ status: 200, description: 'OTP muvaffaqiyatli tasdiqlandi' })
    verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.verificationService.verifyOtp(dto)
    }
}
