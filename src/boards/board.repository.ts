import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly repo: Repository<Board>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.repo.find();
  }

  async createBoard(dto: CreateBoardDto): Promise<Board> {
    const { title, description } = dto;

    const board = this.repo.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    return this.repo.save(board);
  }

  async findByIdOrThrow(id: string): Promise<Board> {
    const found = await this.repo.findOneBy({ id });
    if (!found) throw new NotFoundException(`Can't find Board with id ${id}`);
    return found;
  }

  async deleteByIdOrThrow(id: string): Promise<void> {
    const result = await this.repo.delete({ id });
    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateStatus(id: string, status: BoardStatus): Promise<Board> {
    const board = await this.findByIdOrThrow(id);
    board.status = status;
    return this.repo.save(board);
  }
}