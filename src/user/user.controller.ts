import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ResponseInterCeptor } from 'src/common/transform-reponse';
import { ResisterDto } from './dto/resister-user.dto';
import { UserService } from './user.service';
@UseInterceptors(ResponseInterCeptor)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    async postUser(@Body() dto: ResisterDto) {
        return await this.userService.postUser(dto);
    }
}
