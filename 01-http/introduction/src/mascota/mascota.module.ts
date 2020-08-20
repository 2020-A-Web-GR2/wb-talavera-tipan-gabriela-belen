import {MascotaEntity} from "./mascota.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaService} from "./mascota.service";

@Module(
    {
        controllers:[],
        imports:[
            TypeOrmModule
                .forFeature([
                        MascotaEntity
                    ],
                    'default' //Nombre cadena de conexion
                )
        ],
        providers:[MascotaService],
        exports:[
            MascotaService
        ]
    }
)
export class MascotaModule{

}