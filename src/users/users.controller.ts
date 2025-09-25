import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    pseudo: string;
  };
}

export class UpdateProfileDto {
  pseudo?: string;
  avatar?: string;
  notifications?: boolean;
  preferences?: Record<string, any>;
}

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
    @Body(ValidationPipe) updateData: UpdateProfileDto
  ) {
    const { ...allowedUpdates } = updateData;
    return this.usersService.updateUser(req.user.id, allowedUpdates);
  }
}