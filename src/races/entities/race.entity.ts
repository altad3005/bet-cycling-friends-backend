import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Prediction } from '../../predictions/entities/prediction.entity';

export enum RaceType {
  ONE_DAY = 'one_day',
  STAGE = 'stage',
  GRAND_TOUR = 'grand_tour',
}

export enum RaceStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  FINISHED = 'finished',
}

@Entity('races')
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: RaceType })
  type: RaceType;

  @Column({ type: 'enum', enum: RaceStatus, default: RaceStatus.UPCOMING })
  status: RaceStatus;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column()
  predictionDeadline: Date;

  @Column({ type: 'json', nullable: true })
  startlist: string[]; // Array of rider names/IDs

  @Column({ type: 'json', nullable: true })
  results: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  profile: Record<string, any>; // Race profile data

  @OneToMany(() => Prediction, (prediction) => prediction.race)
  predictions: Prediction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
