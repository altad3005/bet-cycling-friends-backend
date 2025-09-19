import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaguesUsersService } from './leagues_users.service';
import { CreateLeaguesUserDto } from './dto/create-leagues_user.dto';
import { UpdateLeaguesUserDto } from './dto/update-leagues_user.dto';

@Controller('leagues-users')
export class LeaguesUsersController {
  constructor(private readonly leaguesUsersService: LeaguesUsersService) {}

  @Post()
  create(@Body() createLeaguesUserDto: CreateLeaguesUserDto) {
    return this.leaguesUsersService.create(createLeaguesUserDto);
  }

  @Get()
  findAll() {
    return this.leaguesUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaguesUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaguesUserDto: UpdateLeaguesUserDto) {
    return this.leaguesUsersService.update(+id, updateLeaguesUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaguesUsersService.remove(+id);
  }
}
