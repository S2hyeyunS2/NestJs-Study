import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.findAll();
  }

  createBoard(dto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(dto);
  }

  getBoardById(id: string): Promise<Board> {
    return this.boardRepository.findByIdOrThrow(id);
  }

  deleteBoard(id: string): Promise<void> {
    return this.boardRepository.deleteByIdOrThrow(id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateStatus(id, status);
  }
}