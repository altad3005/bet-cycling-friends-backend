import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserLeague } from '../../user_league/entities/user_league.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ unique: true })
  inviteCode: string;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ type: 'json', nullable: true })
  settings: Record<string, any>;

  @ManyToOne(() => User, user => user.createdLeagues)
  creator: User;

  @OneToMany(() => UserLeague, userLeague => userLeague.league)
  userLeagues: UserLeague[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
