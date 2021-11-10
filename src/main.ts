import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterCeptor } from './common/transform-reponse';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);

  let config: Omit<OpenAPIObject, 'paths'>;
  // eslint-disable-next-line prefer-const
  config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  //app.useGlobalInterceptors(new ResponseInterCeptor());

  //  app.useGlobalInterceptors(newResponseInterCeptor())

  const port = process.env.PORT || 5909
  console.log('ServerPort :', port);
  await app.listen(port);

  if (module.hot) {
    // new !
    module.hot.accept(); // new !
    module.hot.dispose(() => app.close()); // new !
  }
}
bootstrap();
