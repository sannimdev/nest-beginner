import { Body, Controller, Get, Post } from '@nestjs/common';
import { title } from 'process';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[] {
        // 타입을 적극적으로 정의해서 다른 타입을 반환할 시 오류를 발생시켜 개발자가 알아차리게 해야 한다.
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    // createBoard(@Body('title') title: string, @Body('description') description: string) {}
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }
}