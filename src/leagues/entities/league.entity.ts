import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LeagueMember } from '../../leagues_users/entities/leagues_user.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => LeagueMember, (member) => member.league)
  members: LeagueMember[];
}
