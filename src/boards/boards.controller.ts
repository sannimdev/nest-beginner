import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    // constructor(private boardsService: BoardsService) {}
    // @Get('/')
    // getAllBoard(): Board[] {
    //     // 타입을 적극적으로 정의해서 다른 타입을 반환할 시 오류를 발생시켜 개발자가 알아차리게 해야 한다.
    //     return this.boardsService.getAllBoards();
    // }
    // @Post('/')
    // @UsePipes(ValidationPipe)
    // // createBoard(@Body('title') title: string, @Body('description') description: string) {}
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    // // loaclhost:3333?id=abcde => @Param('id)
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }
    // @Delete('/:id')
    // deleteBoardById(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }
    // @Put('/:id')
    // updateBoardById(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     const board = this.boardsService.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
