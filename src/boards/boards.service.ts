import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    // DB 대용 더미데이터
    private boards = [];

    getAllBoards() {
        return this.boards;
    }
}
