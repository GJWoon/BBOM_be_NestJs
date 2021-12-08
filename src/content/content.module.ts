import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';
import { ClothesInfo } from './entities/clothes-info.entity';
import { ClothesInfoImage } from './entities/clothes-info-image.entity';
import { Content } from './entities/content';
import { ContentImage } from './entities/content-image';
import { ContentLike } from './entities/content-like';
import { ContentRepository } from './repository/content.repostiory';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [
    TypeOrmModule.forRoot({
      entities: ["./dist/**/entities/*.js", "src/**/entities/*{.ts,.js}",

      ], autoLoadEntities: true
    }), TypeOrmModule.forFeature([ClothesInfo, ClothesInfoImage, Content, ContentImage, ContentLike, ContentRepository])],

})
export class ContentModule { }
