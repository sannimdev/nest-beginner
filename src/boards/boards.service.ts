import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(@InjectRepository(BoardRepository) private boardRepository: BoardRepository) {}

    async getAllBoards(user: User): Promise<Board[]> {
        // 자기가 작성한 글만 가져오는 것으로 변경하기
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :id', { id: user.id });

        const boards = await query.getMany();
        return boards;
    }

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        return this.boardRepository.getBoardById(id);
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({ id, user });

        if (!result.affected) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
