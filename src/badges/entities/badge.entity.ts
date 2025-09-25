import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @Column({ type: 'json' })
  criteria: Record<string, any>; // Conditions to unlock

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_badges',
    joinColumn: { name: 'badge_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
