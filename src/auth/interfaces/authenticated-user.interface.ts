import { League } from '../../leagues/entities/league.entity';
import { Role } from '../../common/enums/role.enum';
import { UserLeague } from '../../user_league/entities/user_league.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

export interface AuthenticatedUser {
  id: string;
  email: string;
  pseudo: string;
  avatar: string;
  notifications: boolean;
  preferences: Record<string, any>;
  role: Role;
  createdLeagues: League[];
  userLeagues: UserLeague[];
  predictions: Prediction[];
  createdAt: Date;
  updatedAt: Date;
}
