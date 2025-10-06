import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto, requestingUser?: User) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const existingPseudo = await this.usersService.findByPseudo(
      registerDto.pseudo,
    );
    if (existingPseudo) {
      throw new ConflictException('Pseudo already taken');
    }

    if (registerDto.role === Role.ADMIN) {
      if (!requestingUser || requestingUser.role !== Role.ADMIN) {
        throw new ForbiddenException('Only admins can create admin accounts');
      }
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: registerDto.role || Role.USER,
    });

    const payload = {
      email: user.email,
      sub: user.id,
      pseudo: user.pseudo,
      role: user.role,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async login(user: AuthenticatedUser) {
    const payload = {
      email: user.email,
      sub: user.id,
      pseudo: user.pseudo,
      role: user.role,
    };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | null> {
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
