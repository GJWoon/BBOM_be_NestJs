import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user';
import { Repository } from 'typeorm';
import bcrpyt from 'bcrypt';
import { LoginDto } from 'src/user/dto/login.dto';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user: User = await this.userRepository.createQueryBuilder('u')
            .where('u.email = :email', { email: email })
            .getOne();

        if (!user) {
            throw new UnauthorizedException('해당 유저를 찾을 수 없습니다.');
        }
        console.log(password);
        console.log(user.password);

        const passwordCheck = await bcrpyt.compare(password, user.password);

        if (passwordCheck) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new UnauthorizedException('아이디나 비밀번호가 일치하지 않습니다.');
        }


        return null
    }

    async login(user: User) {
        const userId = user.id;
        const payload = {
            sub: user.id

        }
        return {
            user: { user },
            token: `Bearer ${this.jwtService.sign(payload)}`
        }
    }

    async getUser(id: number) {
        return await this.userRepository.createQueryBuilder('u')
            .where('u.id = :id', { id: id }).getOne();
    }

}
