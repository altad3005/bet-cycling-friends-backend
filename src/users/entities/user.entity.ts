import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bet } from '../../bets/entities/bet.entity';
import { LeagueMember } from '../../leagues_users/entities/leagues_user.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  pseudo: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => LeagueMember, (member) => member.user)
  leagues: LeagueMember[];

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];
}
