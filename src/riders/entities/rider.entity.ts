import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Rider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column()
  team: string;

  @Column({ nullable: true })
  uciRanking: number;
}
