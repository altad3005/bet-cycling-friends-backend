import { Module } from '@nestjs/common';
import { LeaguesUsersService } from './leagues_users.service';
import { LeaguesUsersController } from './leagues_users.controller';

@Module({
  controllers: [LeaguesUsersController],
  providers: [LeaguesUsersService],
})
export class LeaguesUsersModule {}
