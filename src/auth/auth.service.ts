import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
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
}
