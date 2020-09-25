import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {HttpDeberModule} from "./http/deber/http-deber.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioModule} from "./usuario/usuario.module";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {VacunaEntity} from "./vacuna/vacuna.entity";
//decorador
@Module({
  imports: [
      //puede contener otros modulos
      HttpJuegoModule,
      HttpDeberModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule
          .forRoot( {
              name:'default', //nombre conexion
              type: 'mysql', //mysql postgres
            host:'localhost', //ip
            port:3306, //puerto
            username: 'root',
            password: 'root',
            database:'ejemplo', //Base de datos
            entities:[ //Todas las entidades
                UsuarioEntity,
                MascotaEntity,
                VacunaEntity,

            ],
            synchronize: true, //actualiza el esquema de la base de datos
            dropSchema: false,//Eliminar datos y el eesquema de base de datos
}),
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
