import { Test, TestingModule } from '@nestjs/testing';
import { NotifiactionsService } from './notifiactions.service';

describe('NotifiactionsService', () => {
  let service: NotifiactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifiactionsService],
    }).compile();

    service = module.get<NotifiactionsService>(NotifiactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
