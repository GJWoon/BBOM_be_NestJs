import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { info } from 'console';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Page } from 'src/common/dto/page.dto';
import { Connection } from 'typeorm';
import { ClothesInfoDto } from './dto/clothes-info.dto';
import { ContentDto } from './dto/content.dto';
import { ClothesInfo } from './entities/clothes-info.entity';
import { ClothesInfoImage } from './entities/clothes-info-image.entity';
import { Content } from './entities/content';
import { ContentRepository } from './repository/content.repostiory';

@Injectable()
export class ContentService {

    constructor(private connection: Connection,
        private contentRepository: ContentRepository
    ) { }

    async postContnet(dto: ContentDto, infoImageList: Express.Multer.File[], contentImageList: Express.Multer.File[]) {
        const queryRunner = this.connection.createQueryRunner();
        const manager = queryRunner.manager;
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const content: Content = Content.create(dto);
        const clothesInfoList: ClothesInfo[] = this.createNewClotheInfoList(dto.infoList, infoImageList, content);

        content.clohtesInfos = clothesInfoList;
        console.log('this save before', clothesInfoList)

        try {
            await manager.getRepository(Content).save(content);
            await queryRunner.commitTransaction();
            //await manager.getRepository(ClothesInfo).save(clothesInfoList);
        } catch (Error) {
            console.log(Error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

    }

    createNewClotheInfoList(dtoList: ClothesInfoDto[], imageList: Express.Multer.File[], content: Content) {
        let clothesInList: ClothesInfo[] = [];

        dtoList.forEach(e => {
            let i = 0;
            let clotheImage = new ClothesInfoImage();
            clotheImage.path = imageList[i].path;
            const clotheInfo = ClothesInfo.create(e, content, clotheImage);
            //     clotheImage.clothesInfo = clotheInfo;
            clothesInList.push(clotheInfo);
            i = i + 1;
        })
        return clothesInList;
    }


    async getContentPaging(page: number, limit: number, query: string) {

        const result = await this.contentRepository.getContentPaging(page, limit, query);
        return new Page(result[1], page, result[0]);
    }

}
