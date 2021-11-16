import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { type } from "os";
import { ContentDto } from "src/content/dto/content.dto";





export const FormBody = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        let dto: any = JSON.parse(JSON.stringify(request.body))
        let ji = {};

        const keys = Object.keys(dto);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            //   ji = keys[i]
            // ji = JSON.parse(dto[key]);
            try {
                ji[key] = JSON.parse(dto[key]);
            } catch (Error) {

                console.log('this string')
                console.log(dto[key]);
                ji[key] = dto[key];
            }
            console.log(ji);
        }
        //console.log(typeof (dto));
        //console.log(typeof (dto.infoList));
        //console.log('dto infolist brandName', dto.infoList.brandName);
        return ji;
    }
)