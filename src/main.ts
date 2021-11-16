import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterCeptor } from './common/transform-reponse';
import fs, { mkdir } from 'fs';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './httpException.filter';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import passport from 'passport';
import { Jwt } from './common/jwt-current-user.decorator';
declare const module: any;


// try {
//   if (!fs.existsSync('upload')) {
//     fs.mkdirSync('upload');
//   };
// } catch (error) {
//   console.log('Upload File 생성 실패!')
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: true });
  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterCeptor)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe);
  app.useGlobalFilters(new HttpExceptionFilter());
  let config: Omit<OpenAPIObject, 'paths'>;
  // eslint-disable-next-line prefer-const
  config = new DocumentBuilder()
    .setTitle('BBOM API')
    .setDescription('BBOM 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useStaticAssets(
    path.join('/Users/geumjiun/Desktop/GJWoon/BBOM/bbom'),
    {
      prefix: '/upload',
    },
  );
  app.use(passport.initialize());

  app.useStaticAssets(
    path.join(__dirname, '..', 'public'),
    {
      prefix: '/dist',
    },
  ); SwaggerModule.setup('swagger', app, document);
  //app.useGlobalInterceptors(new ResponseInterCeptor());

  //  app.useGlobalInterceptors(newResponseInterCeptor())

  // app.enableCors({
  //   origin: true,
  //   credentials: true,
  // })

  //app.useGlobalPipes(new ValidationPipe());
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