import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { ClothesInfo } from './content/entities/clothes-info';
import { ClothesInfoImage } from './content/entities/clothes-info-image';
import { Content } from './content/entities/content';
import { ContentImage } from './content/entities/content-image';
import { ContentLike } from './content/entities/content-like';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContentModule,
    TypeOrmModule.forFeature([ClothesInfo, ClothesInfoImage, Content, ContentImage, ContentLike, User]),
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
    UserModule

  ],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
