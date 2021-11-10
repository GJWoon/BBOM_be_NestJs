import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResisterDto } from './dto/resister-user.dto';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
