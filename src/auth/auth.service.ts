import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto, CreateAdminDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { AuthenticatedUser } from '../users/interfaces/authenticated-user.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, requestingUser?: User) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Vérifier si le pseudo est déjà pris
    const existingPseudo = await this.usersService.findByPseudo(
      registerDto.pseudo,
    );
    if (existingPseudo) {
      throw new ConflictException('Pseudo already taken');
    }

    // Seuls les admins peuvent créer d'autres admins
    if (registerDto.role === Role.ADMIN) {
      if (!requestingUser || requestingUser.role !== Role.ADMIN) {
        throw new ForbiddenException('Only admins can create admin accounts');
      }
    }

    // Hash le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Créer l'utilisateur
    const user: User = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: registerDto.role || Role.USER,
    });

    // Générer le token JWT
    const payload = {
      email: user.email,
      sub: user.id,
      pseudo: user.pseudo,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const adminData = {
      ...createAdminDto,
      role: Role.ADMIN,
    };

    // Créer un admin sans vérification de rôle (pour le premier admin)
    return this.register(adminData);
  }

  async login(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id, pseudo: user.pseudo };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }
}
