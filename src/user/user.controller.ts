import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBasicAuth, ApiBearerAuth, ApiConsumes, ApiHeaders, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Multer } from 'multer';
import { ResponseInterCeptor } from 'src/common/transform-reponse';
import { ResisterDto } from './dto/resister-user.dto';
import { UserService } from './user.service';
import { Express } from 'express';
import { LocalStrategy } from 'src/auth/local.strategy';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Jwt } from 'src/common/jwt-current-user.decorator';
@UseInterceptors(ResponseInterCeptor)
@Controller('user')
export class UserController {

    constructor(private userService: UserService,
    ) { }

    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: '회원가입' })
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async postUser(@Body() dto: ResisterDto, @UploadedFile() image: Express.Multer.File) {
        return await this.userService.postUser(dto, image);
    }


    @ApiOperation({ summary: '회원가입 이메일 중복체크' })
    @Get("/duplicate")
    async duplicateCheckEmail(@Query('email') email: string) {
        return await this.userService.duplicateCheckUserEmail(email);
    }


    @ApiBearerAuth('JWT')
    @UseGuards(AuthGuard('jwt'))
    @Get('/test')
    async test(@Jwt() token: string) {
        console.log('decorator Jwt', token);
    }
}
