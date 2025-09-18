import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bet } from '../../bets/entities/bet.entity';

export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'one_day' | 'stage_race' | 'grand_tour';

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @OneToMany(() => Bet, (bet) => bet.race)
  predictions: Bet[];
}
