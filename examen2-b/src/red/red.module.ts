import {Module} from "@nestjs/common";
import {RedController} from "./red.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RedEntity} from "./red.entity";
import {RedService} from "./red.service";

@Module({
    controllers: [
        RedController
    ],
    imports: [
        RedModule,
        TypeOrmModule
            .forFeature(
                [
                    RedEntity
                ],
                'default' // Nombre cadena de conexión
            ),
    ],
    providers: [
        RedService
    ]
})

export class RedModule{

}