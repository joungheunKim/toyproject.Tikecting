import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey:process.env.JWT_SECRET_KET
        })
    }

    async validate(payload: Payload, done: VerifiedCallback): Promise<any>{
        const user = await this.authService.tokenValidateUser(payload)
        if(!user) {
            return done(new UnauthorizedException({message: '사용자를 찾을 수 없습니다'}))
        }
        return done(null, user)
    }
}