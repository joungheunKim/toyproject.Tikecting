import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard as NestAutGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard extends NestAutGuard('jwt'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
}