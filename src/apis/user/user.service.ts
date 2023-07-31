import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/apis/user/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { AuthDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 유저 조회
  async getUser(userId: number) {
    const findUser = await this.userRepository.findOne({
      where: { userId, deleteAt: null },
      select: ['loginId', 'nickname', 'password', 'point'],
    });

    if (!findUser) throw new NotFoundException('해당유저가 존재하지 않습니다');
    return findUser;
  }

  // 유저 회원가입
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

    // // 비밀번호 암호화 ) 로그인시 일치확인 실패, 시간부족으로 일단은 건너뜀
    // const hashPassword = await bcrypt.hash(
    //   // 첫 번째 인수 : 암호화할 비밀번호
    //   // 두 번째 인수 : 암호화에 사용할 salt 값, 값이 클수록 보안성은 높아지지만 암호화 시간은 길어진다.
    //   password,
    //   10,
    // );

    this.userRepository.insert({
      loginId,
      nickname,
      password,
    });

    return '회원가입에 성공했습니다.';
  }

  // 어드민 회원가입
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

    this.userRepository.insert({
      loginId,
      nickname,
      password,
      isAdmin: true,
      point: false,
    });
    return '회원가입에 성공했습니다.';
  }

  // 로그인
  async findByFields(options: FindOneOptions<AuthDto>): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
}


}
