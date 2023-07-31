import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { async } from 'rxjs';

@Controller('user')
export class UserController {
    // 서비스 주입
    constructor(private readonly userService: UserService) {}

    @Get('/:userId')
    async getUser(@Param('userId') userId: number) {
        return await this.userService.getUser(userId);
    }

    @Post('/signup')
    async signup(@Body() data: UserDto) {
        return this.userService.signup(
            data.loginId,
            data.nickname,
            data.password,
            data.confirmPassword,
            );
    }

    @Post('/signup/admin')
    async admin(@Body() data: UserDto) {
        return this.userService.admin(
            data.loginId,
            data.nickname,
            data.password,
            data.confirmPassword
            );
    }

}
