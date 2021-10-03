import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';

// 진입점
@Module({
    imports: [BoardsModule],
    // controllers: [AppController],
    // providers: [AppService],
})
export class AppModule {}
