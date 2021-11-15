import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ContentDto } from './dto/content.dto';

@Controller('content')
export class ContentController {


    @ApiOperation({

        summary: '게시글 쓰기'
    })
    @Post()
    @ApiBody({ type: ContentDto })
    async postContent(@Body() dto: ContentDto) {

        console.log(dto);

    }
}
