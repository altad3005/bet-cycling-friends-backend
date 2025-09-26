import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { UsersService } from '../users/users.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN) // Seuls les admins peuvent accéder à ce contrôleur
export class AdminController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    // Logique pour supprimer un utilisateur
    return { message: `Utilisateur ${id} supprimé (admin seulement)` };
  }

  @Get('stats')
  async getStats() {
    // Statistiques générales
    return { message: 'Statistiques de la plateforme (admin seulement)' };
  }
}
