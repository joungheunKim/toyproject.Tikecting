import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/apis/user/user.entity';

@Module({
  // Module에서 entity 명시
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
