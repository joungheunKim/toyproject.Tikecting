import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly loginId: string;

  @IsString()
  readonly nickname: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly confirmPassword: string;
}