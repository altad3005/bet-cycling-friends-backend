import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Race } from '../../races/entities/race.entity';

export enum BonusType {
  FLAT_TIRE = 'flat_tire', // Pneu crevé
  BREAKAWAY = 'breakaway', // Coup de bordure
  COUNTER_PICK = 'counter_pick', // Contre-prono
  CAPTAIN = 'captain', // Capitaine
  SWAP = 'swap', // Swap
  SUBSTITUTE = 'substitute', // Remplaçant
}

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.predictions)
  user: User;

  @ManyToOne(() => Race, (race) => race.predictions)
  race: Race;

  @Column()
  riderName: string; // Main prediction

  @Column({ type: 'enum', enum: BonusType, nullable: true })
  bonusType: BonusType;

  @Column({ type: 'json', nullable: true })
  bonusData: Record<string, any>; // Bonus-specific data

  @Column({ default: 0 })
  pointsEarned: number;

  @Column({ default: false })
  isProcessed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
