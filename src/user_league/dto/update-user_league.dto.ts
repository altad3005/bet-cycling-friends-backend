import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLeagueDto } from './create-user_league.dto';

export class UpdateUserLeagueDto extends PartialType(CreateUserLeagueDto) {}
