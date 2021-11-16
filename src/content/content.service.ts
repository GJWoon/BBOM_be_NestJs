import { Injectable } from '@nestjs/common';
import { info } from 'console';
import { Connection } from 'typeorm';
import { ClothesInfoDto } from './dto/clothes-info.dto';
import { ContentDto } from './dto/content.dto';
import { ClothesInfo } from './entities/clothes-info';
import { ClothesInfoImage } from './entities/clothes-info-image';
import { Content } from './entities/content';

@Injectable()
export class ContentService {

    constructor(private connection: Connection) { }

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



}
