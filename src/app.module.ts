import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 진입점
@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
