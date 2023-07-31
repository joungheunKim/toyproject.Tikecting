import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    async login(@Body() authDto:AuthDto): Promise<any>{
        return await this.authService.validateUser(authDto)
    }
}
