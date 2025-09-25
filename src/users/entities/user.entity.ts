import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { League } from '../../leagues/entities/league.entity';
import { UserLeague } from '../../user_league/entities/user_league.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  pseudo: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: true })
  notifications: boolean;

  @Column({ type: 'json', nullable: true })
  preferences: Record<string, any>;

  @OneToMany(() => League, (league) => league.creator)
  createdLeagues: League[];

  @OneToMany(() => UserLeague, (userLeague) => userLeague.user)
  userLeagues: UserLeague[];

  @OneToMany(() => Prediction, (prediction) => prediction.user)
  predictions: Prediction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
