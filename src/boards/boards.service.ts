import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(@InjectRepository(BoardRepository) private boardRepository: BoardRepository) {}

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (!result.affected) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // // DB 대용 더미데이터
    // private boards: Board[] = [
    //     {
    //         id: '22167970-244e-11ec-bd0c-2116b9cd367c',
    //         title: '안녕하세요',
    //         description: 'ㅎㅎ',
    //         status: BoardStatus.PUBLIC,
    //     },
    // ];
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };
    //     this.boards.push(board);
    //     return board;
    // }
    // getBoardById(id: string): Board {
    //     // 서비스에서 예외를 발생시킨다.
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Can't find board with id ${id}`);
    //     }
    //     return found;
    // }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
