import { Injectable } from '@nestjs/common';
import { CreateUserLeagueDto } from './dto/create-user_league.dto';
import { UpdateUserLeagueDto } from './dto/update-user_league.dto';

@Injectable()
export class UserLeagueService {
  create(createUserLeagueDto: CreateUserLeagueDto) {
    return 'This action adds a new userLeague';
  }

  findAll() {
    return `This action returns all userLeague`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLeague`;
  }

  update(id: number, updateUserLeagueDto: UpdateUserLeagueDto) {
    return `This action updates a #${id} userLeague`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLeague`;
  }
}
