import { Module } from '@nestjs/common';
import { NotifiactionsService } from './notifiactions.service';
import { NotifiactionsController } from './notifiactions.controller';

@Module({
  controllers: [NotifiactionsController],
  providers: [NotifiactionsService],
})
export class NotifiactionsModule {}
