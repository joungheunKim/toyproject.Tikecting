import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(authDto: AuthDto): Promise<AuthDto | undefined> {
    let findUser: AuthDto = await this.userService.findByFields({
      where: { loginId: authDto.loginId },
    });

    if (!findUser || findUser.password !== authDto.password) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요');
    }
    return findUser;
  }
}
