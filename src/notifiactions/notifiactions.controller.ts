import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotifiactionsService } from './notifiactions.service';
import { CreateNotifiactionDto } from './dto/create-notifiaction.dto';
import { UpdateNotifiactionDto } from './dto/update-notifiaction.dto';

@Controller('notifiactions')
export class NotifiactionsController {
  constructor(private readonly notifiactionsService: NotifiactionsService) {}

  @Post()
  create(@Body() createNotifiactionDto: CreateNotifiactionDto) {
    return this.notifiactionsService.create(createNotifiactionDto);
  }

  @Get()
  findAll() {
    return this.notifiactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notifiactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotifiactionDto: UpdateNotifiactionDto) {
    return this.notifiactionsService.update(+id, updateNotifiactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notifiactionsService.remove(+id);
  }
}
