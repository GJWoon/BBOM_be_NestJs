import { Controller, Get, Query, Res, } from "@nestjs/common";
import { Response } from "express";
var fs = require('fs');
@Controller('resource')
export class ResourceApi {


    @Get("/image")
    getImage(@Query('path') path: string, @Res() res: Response) {

        fs.readFile(`/Users/geumjiun/Desktop/GJWoon/BBOM/bbom/upload/${path}`, function (_err, data) {
            console.log('picture loading...');
            res.writeHead(200);
            res.write(data);
            res.end();
        });
    }

}