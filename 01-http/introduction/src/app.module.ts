import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
//decorador
@Module({
  imports: [
      //puede contener otros modulos
      HttpJuegoModule
  ],
  controllers: [
      //Controladores AppModules
      AppController
  ],
  providers: [
  //Servicios AppModules
      AppService
  ],
})
//clase
export class AppModule {}
