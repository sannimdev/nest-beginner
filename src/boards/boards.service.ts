import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    // DB 대용 더미데이터
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }
}
