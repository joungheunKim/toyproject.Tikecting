import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './auth.dto';
import { Payload } from './security/payload.interface';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(authDto: AuthDto): Promise<{accessToken: string} | undefined> {
    let findUser: User = await this.userService.findByFields({
      where: { loginId: authDto.loginId },
    });

    if (!findUser || findUser.password !== authDto.password) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요');
    }
    const payload: Payload = { id: findUser.userId,  loginId: findUser.loginId }
    return {
        accessToken: this.jwtService.sign(payload)
    }
  }

  async tokenValidateUser(payload:Payload): Promise<AuthDto | undefined>{
    return await this.userService.findByFields({
      where: { loginId: payload.loginId }
    })
  }
}
