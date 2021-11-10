import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    { logger: ['error', 'warn'] });
 
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
