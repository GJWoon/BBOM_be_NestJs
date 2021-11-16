import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ApiImplicitFormData } from 'src/common/api-implicit-form-data.decorator';
import { FormBody } from 'src/common/form-data-json-parser.decorator';
import { ContentService } from './content.service';
import { ContentDto } from './dto/content.dto';
import { Content } from './entities/content';

@Controller('content')
export class ContentController {

    constructor(private contentService: ContentService) { }

    @ApiOperation({
        summary: '게시글 쓰기'
    })
    @Post()
    @ApiBody({ type: ContentDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'infoImages', maxCount: 10 },
        { name: 'contentImages', maxCount: 10 },
    ]))
    async postContent(
        @FormBody() dto: ContentDto
        , @UploadedFiles() files: {
            infoImages: Express.Multer.File[],
            contentImages: Express.Multer.File[]
        }
    ) {
        await this.contentService.postContnet(dto, files.infoImages, files.contentImages);
    }


    @ApiOperation({
        summary: '게시글 페이징 조회'
    })
    @Get()
    async getContentPaging(
        @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe('10'), ParseIntPipe) limit: number,
        @Query('query',) query:string
    ) {
        return this.contentService.getContentPaging(page, limit,query);
    }
}
