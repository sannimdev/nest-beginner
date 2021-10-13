import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions: {
                expiresIn: jwtConfig.expiresIn,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy], //Auth모듈에서 사용하기 위함
    exports: [JwtStrategy, PassportModule], // 다른 모듈에서 사용하기 위해서 넣어 줌
})
export class AuthModule {}
