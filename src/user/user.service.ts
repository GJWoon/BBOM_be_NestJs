import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResisterDto } from './dto/resister-user.dto';
import { User } from './entities/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRespository: Repository<User>) {
    }

    async postUser(dto: ResisterDto) {

        const hashPassword: string = await bcrypt.hash(dto.password, 12);

        const d: string = 'd';

        let users: User = new User(dto.email, dto.nickName, dto.phone, hashPassword);
        //let users: User = new User(d, d, d, hashPassword);

        // const user = new User();

        // user.email = dto.email;
        // user.nickName = dto.nickName;
        // user.password = hashPassword;
        // user.phone = dto.phone;

        await this.userRespository.save(users);
        return true;
    }

}
