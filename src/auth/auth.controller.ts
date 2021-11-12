import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {


    constructor(private authService: AuthService) { }


    @ApiOperation({ summary: '로그인' })
    @Post("/login")
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @Request() req) {
        return await this.authService.login(req.user);
    }


}
