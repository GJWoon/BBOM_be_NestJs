import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class ResisterDto {

    @ApiProperty({
        description: '닉네임',
        example: 'iu'
    })
    @IsNotEmpty()
    @IsString()
    public nickName: string;

    @ApiProperty({
        description: '전화번호',
        example: '01064629722'
    })
    @IsString()
    @IsNotEmpty()
    public phone: string;

    @ApiProperty({
        description: '이메일',
        example: 'iu@love.com'
    })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        description: '비밀번호'

    })
    @IsString()
    @IsNotEmpty()
    public password: string;


    @ApiProperty({
        description: 'Attachments',
        type: 'file',
        items: {
            type: 'file',
            items: {
                type: 'string',
                format: 'binary',
            },
        },
    })
    image: any;

}