import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaguesUserDto } from './create-leagues_user.dto';

export class UpdateLeaguesUserDto extends PartialType(CreateLeaguesUserDto) {}
