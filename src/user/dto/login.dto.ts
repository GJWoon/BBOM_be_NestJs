import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginDto {

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
    contentImages: any;

}