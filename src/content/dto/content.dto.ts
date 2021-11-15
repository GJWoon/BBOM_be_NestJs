import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ClothesInfo } from "../entities/clothes-info";
import { ClothesInfoDto } from "./clothes-info.dto";


export class ContentDto {


    @ApiProperty({
        description: '글 내용',
        example: '아이유 이뻐요'
    })
    @IsString()
    content: string;


    @ApiProperty({
        description: '제품 정보 배열',
        isArray: true,
        type: ClothesInfoDto
    })
    infoList: ClothesInfoDto[];

    @ApiProperty({
        description: '태그 배열',
    })
    tagList: Array<string>;



}

