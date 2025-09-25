import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
