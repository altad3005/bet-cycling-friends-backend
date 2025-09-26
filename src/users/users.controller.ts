import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request.interface';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMyProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.id);
  }

  @Put('me')
  async updateMyProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateData: UpdateProfileDto,
  ) {
    return this.usersService.updateUser(req.user.id, updateData);
  }
}
