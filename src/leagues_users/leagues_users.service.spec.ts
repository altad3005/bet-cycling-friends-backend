import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesUsersService } from './leagues_users.service';

describe('LeaguesUsersService', () => {
  let service: LeaguesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaguesUsersService],
    }).compile();

    service = module.get<LeaguesUsersService>(LeaguesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
