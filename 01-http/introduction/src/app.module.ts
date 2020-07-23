import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpDeberModule} from "./http/deber/http-deber.module";
//decorador
@Module({
  imports: [
      //puede contener otros modulos
      HttpJuegoModule,
      HttpDeberModule
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
