import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLeagueService } from './user_league.service';
import { CreateUserLeagueDto } from './dto/create-user_league.dto';
import { UpdateUserLeagueDto } from './dto/update-user_league.dto';

@Controller('user-league')
export class UserLeagueController {
  constructor(private readonly userLeagueService: UserLeagueService) {}

  @Post()
  create(@Body() createUserLeagueDto: CreateUserLeagueDto) {
    return this.userLeagueService.create(createUserLeagueDto);
  }

  @Get()
  findAll() {
    return this.userLeagueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLeagueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLeagueDto: UpdateUserLeagueDto) {
    return this.userLeagueService.update(+id, updateUserLeagueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLeagueService.remove(+id);
  }
}
