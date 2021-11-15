import { ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";



const fromAuthCookie = function () {
    return function (request: Request) {
        const token: string = request.headers.authorization.split(' ')[1];
        return token;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService,
        private authService: AuthService
    ) {
        super({
            jwtFromRequest: fromAuthCookie(),
            ignoreExpiration: false,
            secretOrKey: 'jwt secret key',
        });
    }

    async validate(payload: any,context:ExecutionContext) {
        console.log('JwtUserId',payload.sub);
        return await this.authService.getUser(payload.sub);
        ;
    }
}

