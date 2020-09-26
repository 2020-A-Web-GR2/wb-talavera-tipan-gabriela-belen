import {Module} from "@nestjs/common";
import {RedController} from "./red.controller";
import {MascotaModule} from "../mascota/mascota.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {UsuarioService} from "../usuario/usuario.service";
import {RedEntity} from "./red.entity";

@Module({
    controllers: [
        RedController
    ],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    RedEntity
                ],
                'default' // Nombre cadena de conexión
            ),
    ],
    providers: [
        UsuarioService
    ]
})

export class RedModule{

}