import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { League } from '../../leagues/entities/league.entity';

@Entity('league_members')
export class LeagueMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.leagues)
  user: User;

  @ManyToOne(() => League, (league) => league.members)
  league: League;

  @Column({ default: 'member' })
  role: 'admin' | 'member';
}
