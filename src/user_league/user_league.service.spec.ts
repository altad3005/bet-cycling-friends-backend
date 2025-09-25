import { Test, TestingModule } from '@nestjs/testing';
import { UserLeagueService } from './user_league.service';

describe('UserLeagueService', () => {
  let service: UserLeagueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLeagueService],
    }).compile();

    service = module.get<UserLeagueService>(UserLeagueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
