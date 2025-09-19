import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesUsersController } from './leagues_users.controller';
import { LeaguesUsersService } from './leagues_users.service';

describe('LeaguesUsersController', () => {
  let controller: LeaguesUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaguesUsersController],
      providers: [LeaguesUsersService],
    }).compile();

    controller = module.get<LeaguesUsersController>(LeaguesUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
