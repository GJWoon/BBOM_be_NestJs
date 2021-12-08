
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { ClothesInfo } from './content/entities/clothes-info.entity';
import { ClothesInfoImage } from './content/entities/clothes-info-image.entity';
import { Content } from './content/entities/content';
import { ContentImage } from './content/entities/content-image';
import { ContentLike } from './content/entities/content-like';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ResourceApi } from './common/resource.api';
import { AuthModule } from './auth/auth.module';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { ContentRepository } from './content/repository/content.repostiory';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/dto/entities/follow';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContentModule,
    TypeOrmModule.forFeature([Follow
      , ClothesInfo, ClothesInfoImage, Content, ContentImage, ContentLike, User, ContentRepository]),
    TypeOrmModule.forRoot({


      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),

    // entities: [__dirname +"/**/entities/*.js", "__dirname/**/entities/*{.ts,.js}"
    // ],autoLoadEntities :true
    // })


    UserModule,
    MulterModule.register({
      dest: 'upload',

    }),
    AuthModule,
    FollowModule,


  ],
  controllers: [AppController, UserController, ResourceApi, ContentController],
  providers: [AppService, UserService, ContentService],


})
export class AppModule { }
