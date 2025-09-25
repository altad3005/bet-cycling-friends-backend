import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { League } from '../../leagues/entities/league.entity';

@Entity('user_leagues')
export class UserLeague {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.userLeagues)
  user: User;

  @ManyToOne(() => League, league => league.userLeagues)
  league: League;

  @Column({ default: 0 })
  totalPoints: number;

  @Column({ default: 0 })
  exactWins: number;

  @Column({ default: 0 })
  podiums: number;

  @Column({ default: 0 })
  longestStreak: number;

  @CreateDateColumn()
  joinedAt: Date;
}
