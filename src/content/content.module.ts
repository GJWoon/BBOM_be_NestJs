import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ClothesInfo } from './entities/clothes-info';
import { ClothesInfoImage } from './entities/clothes-info-image';
import { Content } from './entities/content';
import { ContentImage } from './entities/content-image';
import { ContentLike } from './entities/content-like';

@Module({
  controllers: [ContentController],
  providers: [ContentService],
  imports: [ClothesInfo, ClothesInfoImage, Content, ContentImage, ContentLike],

})
export class ContentModule {}
