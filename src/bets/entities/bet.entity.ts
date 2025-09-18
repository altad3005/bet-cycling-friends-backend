import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Race } from '../../races/entities/race.entity';
import { Rider } from 'src/riders/entities/rider.entity';

export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bets)
  user: User;

  @ManyToOne(() => Race, (race) => race.predictions)
  race: Race;

  @ManyToOne(() => Rider)
  rider: Rider;

  @Column({ nullable: true })
  bonus: string; // ex: 'joker', 'capitaine', 'swap'

  @Column({ default: 0 })
  points: number;
}
