import { Test, TestingModule } from '@nestjs/testing';
import { NotifiactionsController } from './notifiactions.controller';
import { NotifiactionsService } from './notifiactions.service';

describe('NotifiactionsController', () => {
  let controller: NotifiactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifiactionsController],
      providers: [NotifiactionsService],
    }).compile();

    controller = module.get<NotifiactionsController>(NotifiactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
