import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
    // 리포지터리 등록
    imports: [TypeOrmModule.forFeature([BoardRepository])],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}
