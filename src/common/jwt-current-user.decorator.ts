import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";


export const Jwt = createParamDecorator(

    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();

        const token = request.headers.authorization;

        if (!token) {
            throw new UnauthorizedException('토큰이 존재 하지 않습니다.')
        }

        return token;
    }



)