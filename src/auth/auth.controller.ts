import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

// 인증 헷갈력서 강의를 다시 찍었을 정도라고 하니 회독할 때 유의할 것!
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard()) // AuthGuard: @nestjs/passport에서 가져온 AUthGuard()를 이용하면 요청 안에 유저 정보를 넣어줄 수 있음
    test(@Req() req) {
        console.log('req', req);
        return {
            say: 'hello',
        };
    }
}
