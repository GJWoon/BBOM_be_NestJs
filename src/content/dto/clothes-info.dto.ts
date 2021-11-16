import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ClothesInfoDto {

    @ApiProperty({
        description: '제품 내용',
        example: '아이유가 너무 이뻐요'
    })
    @IsString()
    comment: string;
    @ApiProperty({
        description: '사이즈',
        example: 'XL'
    })
    size: string;

    @ApiProperty({
        description: 'price',
        example: '10000'
    })
    price: number;

    @ApiProperty({
        description: '브랜드명',
        example: '나이키'
    })
    brandName: string

    @ApiProperty({
        description: '제품이름',
        example: '나이키 바람막이'
    })
    name: string


}