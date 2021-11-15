import { createParamDecorator, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { resolveObjectURL } from "buffer";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/user/entities/user";




export const Jwt = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)