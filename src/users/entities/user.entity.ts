import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bet } from '../../bets/entities/bet.entity';

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

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];
}
