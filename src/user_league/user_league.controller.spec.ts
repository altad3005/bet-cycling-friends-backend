import { Test, TestingModule } from '@nestjs/testing';
import { UserLeagueController } from './user_league.controller';
import { UserLeagueService } from './user_league.service';

describe('UserLeagueController', () => {
  let controller: UserLeagueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLeagueController],
      providers: [UserLeagueService],
    }).compile();

    controller = module.get<UserLeagueController>(UserLeagueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
