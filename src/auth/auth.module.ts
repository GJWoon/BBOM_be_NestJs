import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, LocalStrategy,],
  imports: [UserModule, PassportModule, TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'jwt secret key',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  exports: [JwtModule],
  controllers: [AuthController]
})
export class AuthModule { }
