import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[] {
        // 타입을 적극적으로 정의해서 다른 타입을 반환할 시 오류를 발생시켜 개발자가 알아차리게 해야 한다.
        return this.boardsService.getAllBoards();
    }
}
