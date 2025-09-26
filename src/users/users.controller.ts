import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  ValidationPipe,
  ForbiddenException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
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
    @Body(ValidationPipe) updateData: UpdateProfileDto
  ) {
    // Les utilisateurs ne peuvent pas changer leur propre rôle
    if ('role' in updateData) {
      throw new ForbiddenException('Cannot change your own role');
    }

    return this.usersService.updateUser(user.id, updateData);
  }

  // Endpoint admin pour voir tous les utilisateurs
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Endpoint admin pour changer le rôle d'un utilisateur
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id/role')
  async changeUserRole(
    @CurrentUser() admin: User,
    @Body() { role }: { role: Role },
  ) {
    // Logique pour changer le rôle d'un utilisateur
    return { message: 'Rôle mis à jour' };
  }
}
