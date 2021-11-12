import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResisterDto } from './dto/resister-user.dto';
import { User } from './entities/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRespository: Repository<User>,
    ) {
    }

    async postUser(dto: ResisterDto, image: Express.Multer.File) {

        const hashPassword: string = await bcrypt.hash(dto.password, 12);

        await this.duplicateCheckUserEmail(dto.email);

        let users: User = new User(dto.email, dto.nickName, dto.phone, hashPassword);

        if (image) {
            users.profileImage = image.originalname;
            console.log(image.originalname);
        }
        await this.userRespository.save(users);
        return true;
    }



    async duplicateCheckUserEmail(email: string): Promise<boolean> {
        const dulplicateUserCount: number = await this.userRespository.createQueryBuilder('u')
            .where('u.email = :email', { email: email })
            .getCount();
        if(dulplicateUserCount != 0 ){
            throw new HttpException('중복된 이메일입니다.',500);
        }
        return true;
    }
}
