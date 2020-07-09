

//@Nombre() -> Decorador
import {Module} from "@nestjs/common";
import {HttpJuegoController} from "./http-juego.controller";
import {AppController} from "../app.controller";

@Module({
    imports:[],
    controllers:[
        HttpJuegoController
    ],
    providers:[],
})

export class HttpJuegoModule{

}