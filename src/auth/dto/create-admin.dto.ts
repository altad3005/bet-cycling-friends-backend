import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  pseudo: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
