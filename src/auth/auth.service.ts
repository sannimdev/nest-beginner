import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        try {
            await this.userRepository.createUser(authCredentialsDto);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException(error);
            }
        }
        /*
            try-catch 블록 미적용 시 다음과 같이 오류가 발생한다.
        { 
            "statusCode": 500,
            "message": "Internal server error"
        }
        */
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (Secret + Payload)
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
