import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board.model";

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: BoardStatus, default: BoardStatus.PUBLIC })
  status: BoardStatus;
}