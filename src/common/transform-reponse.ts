import { CallHandler, ExecutionContext, HttpServer, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { map, Observable } from "rxjs";

export interface Response<T> {
    data: T;
}
@Injectable()
export class ResponseInterCeptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => (this.mapReponse(data))));
    }
    mapReponse(data: any) {
        return {
            data: data,
            status: HttpStatus.OK
        }
    }
}