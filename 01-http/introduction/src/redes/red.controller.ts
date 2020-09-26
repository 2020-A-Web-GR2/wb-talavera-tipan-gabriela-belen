import {Controller, Get, InternalServerErrorException, Res} from "@nestjs/common";
import {RedService} from "./red.service";

@Controller('red')
export class RedController {
    constructor( // Inyección de dependencias
        private readonly _redService: RedService,
    ) {
    }

    @Get()
    async mostrarTodos() {
        try {
            const respuesta = await this._redService.buscarTodos();
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        // return this.arregloUsuarios
    }

    @Get('vista/prueba')
    prueba(
        @Res() res
    ) {

        res.render('red/prueba')
    }
}