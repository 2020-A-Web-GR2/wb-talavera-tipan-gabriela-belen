import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {RedModule} from "./red/red.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RedEntity} from "./red/red.entity";

@Module({
  imports: [RedModule,
    TypeOrmModule.forRoot({
      name:'default', //nombre conexion
      type: 'mysql', //mysql postgres
      host:'localhost', //ip
      port:3306, //puerto
      username: 'root',
      password: 'root',
      database:'examen', //Base de datos
      entities:[
        RedEntity,
      ],
      synchronize: true, //actualiza el esquema de la base de datos
      dropSchema: false,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}













