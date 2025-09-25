import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
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

    // Hash le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // Créer l'utilisateur
    const user: User = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Générer le token JWT
    const payload = { email: user.email, sub: user.id, pseudo: user.pseudo };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, pseudo: user.pseudo };
    return {
      access_token: this.jwtService.sign(payload),
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
