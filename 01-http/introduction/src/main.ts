import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar cosas en JS
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  //LAS CONFIGURACIONES SE REALIZAN EN ESTA AREA
  //await app.listen(3001);
  app.use(cookieParser('%%EXAMEN-WEB%%'));
  app.set('view engine','ejs')
  app.use(express.static('publico'))
  app.use(
      session({
            name:'server-session-id',
            secret:'Vamos bielas',
            resave: true,
            saveUninitialized: true,
            cookie:{secure:false},
            store:new FileStore(),
          }),
  )
  await app.listen(3001);
}
bootstrap();
