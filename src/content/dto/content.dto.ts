import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ClothesInfo } from "../entities/clothes-info.entity";
import { ClothesInfoDto } from "./clothes-info.dto";


export class ContentDto {


    @ApiProperty({
        description: '글 내용',
        example: '아이유 이뻐요'
    })
    @IsString()
    @IsNotEmpty()
    content: string;


    @ApiProperty({
        description: '체형 공개',
        example: true
    })
    isBodyStyleShow: boolean;

    @ApiProperty({
        description: '제품 정보 배열',
        //isArray: true,
        type: () => [ClothesInfoDto,],
    })
    infoList: ClothesInfoDto[];


    @ApiProperty({
        description: '태그 배열',
        type: () => [String]
    })
    tagList: string[];


    @ApiProperty({
        description: 'Attachments',
        type: 'array',
        items: {
            type: 'file',
            items: {
                type: 'string',
                format: 'binary',
            },
        },
    })
    contentImages: any[];
}

