import { Controller, Get, Param } from '@nestjs/common';
import { RacesService } from './races.service';

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Get(':id/startlist')
  async getStartlist(@Param('id') id: string) {
    return this.racesService.getStartlist(id);
  }
}
