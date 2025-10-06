import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  ValidationPipe,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMyProfile(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @Put('me')
  async updateMyProfile(
    @CurrentUser() user: User,
    @Body(ValidationPipe) updateData: UpdateProfileDto,
  ) {
    if ('role' in updateData) {
      throw new ForbiddenException('Cannot change your own role');
    }

    return this.usersService.updateUser(user.id, updateData);
  }
}
