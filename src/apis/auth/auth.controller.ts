import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    async login(@Body() authDto:AuthDto, @Res() res:Response): Promise<any>{
        const jwt = await this.authService.validateUser(authDto)
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken)
        return res.json(jwt)
    }
}
