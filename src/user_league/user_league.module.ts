import { Module } from '@nestjs/common';
import { UserLeagueService } from './user_league.service';
import { UserLeagueController } from './user_league.controller';

@Module({
  controllers: [UserLeagueController],
  providers: [UserLeagueService],
})
export class UserLeagueModule {}
