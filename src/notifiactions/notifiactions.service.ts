import { Injectable } from '@nestjs/common';
import { CreateNotifiactionDto } from './dto/create-notifiaction.dto';
import { UpdateNotifiactionDto } from './dto/update-notifiaction.dto';

@Injectable()
export class NotifiactionsService {
  create(createNotifiactionDto: CreateNotifiactionDto) {
    return 'This action adds a new notifiaction';
  }

  findAll() {
    return `This action returns all notifiactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notifiaction`;
  }

  update(id: number, updateNotifiactionDto: UpdateNotifiactionDto) {
    return `This action updates a #${id} notifiaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} notifiaction`;
  }
}
