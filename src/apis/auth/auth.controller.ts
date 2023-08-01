import { Body, Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    async login(@Body() authDto:AuthDto, @Res() res:Response): Promise<any>{
        const jwt = await this.authService.validateUser(authDto)
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken)
        return res.json(jwt)
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any {
        const user: any = req.user;
        return user
    }
}
