import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //LAS CONFIGURACIONES SE REALIZAN EN ESTA AREA
  //await app.listen(3001);
  app.use(cookieParser('Me gustan las poliburguers'))
  await app.listen(3001);
}
bootstrap();
