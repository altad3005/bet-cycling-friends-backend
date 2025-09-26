import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto, LoginDto, CreateAdminDto } from './dto/auth.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('create-admin')
  async createAdmin(
    @Body(ValidationPipe) createAdminDto: CreateAdminDto,
    @CurrentUser() user: User,
  ) {
    return this.authService.register(
      { ...createAdminDto, role: Role.ADMIN },
      user,
    );
  }

  // Endpoint spécial pour créer le premier admin (à supprimer après usage)
  @Post('setup-admin')
  async setupFirstAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    // TODO: Ajouter une protection (variable d'environnement, etc.)
    // ou supprimer cet endpoint après avoir créé le premier admin
    return this.authService.createAdmin(createAdminDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: any }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: { id: string } }) {
    return this.authService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    // Dans une vraie app, vous pourriez blacklister le token
    return { message: 'Successfully logged out' };
  }
}
