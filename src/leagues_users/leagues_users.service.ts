import { Injectable } from '@nestjs/common';
import { CreateLeaguesUserDto } from './dto/create-leagues_user.dto';
import { UpdateLeaguesUserDto } from './dto/update-leagues_user.dto';

@Injectable()
export class LeaguesUsersService {
  create(createLeaguesUserDto: CreateLeaguesUserDto) {
    return 'This action adds a new leaguesUser';
  }

  findAll() {
    return `This action returns all leaguesUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leaguesUser`;
  }

  update(id: number, updateLeaguesUserDto: UpdateLeaguesUserDto) {
    return `This action updates a #${id} leaguesUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaguesUser`;
  }
}
