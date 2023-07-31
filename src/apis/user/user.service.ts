import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(userId: number) {
    const findUser = await this.userRepository.findOne({
      where: { userId, deleteAt: null },
      select: ['loginId', 'nickname', 'password', 'point'],
    });

    if (!findUser) throw new NotFoundException('해당유저가 존재하지 않습니다');
    return findUser;
  }
  async signup(
    loginId: string,
    nickname: string,
    password: string,
    confirmPassword: string,
  ) {
    const userLoginId = await this.userRepository.findOne({
      where: { loginId },
    });

    const userNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (userLoginId)
      throw new UnauthorizedException('이미 존재하는 아이디입니다.');
    if (userNickname)
      throw new UnauthorizedException('이미 존재하는 닉네임입니다.');
    if (password !== confirmPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    // 비밀번호 암호화
    const hashPassword = await bcrypt.hash(
      // 첫 번째 인수 : 암호화할 비밀번호
      // 두 번째 인수 : 암호화에 사용할 salt 값, 값이 클수록 보안성은 높아지지만 암호화 시간은 길어진다.
      password,
      10,
    );

    this.userRepository.insert({
      loginId,
      nickname,
      password: hashPassword,
    });

    return '회원가입에 성공했습니다.';
  }

  async admin(
    loginId: string,
    nickname: string,
    password: string,
    confirmPassword: string,
  ) {
    const userLoginId = await this.userRepository.findOne({
      where: { loginId },
    });

    const userNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (userLoginId)
      throw new UnauthorizedException('이미 존재하는 아이디입니다.');
    if (userNickname)
      throw new UnauthorizedException('이미 존재하는 닉네임입니다.');
    if (password !== confirmPassword)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    // 비밀번호 암호화
    const hashPassword = await bcrypt.hash(
      // 첫 번째 인수 : 암호화할 비밀번호
      // 두 번째 인수 : 암호화에 사용할 salt 값, 값이 클수록 보안성은 높아지지만 암호화 시간은 길어진다.
      password,
      10,
    );

    this.userRepository.insert({
      loginId,
      nickname,
      password: hashPassword,
      isAdmin: true,
      point: false,
    });
    return '회원가입에 성공했습니다.';
  }
}
