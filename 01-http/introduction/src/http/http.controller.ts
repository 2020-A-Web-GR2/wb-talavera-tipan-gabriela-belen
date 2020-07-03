import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from "@nestjs/common";

// http://localhost:3001/juegos-http
@Controller('juegos-http')

export class HttpJuegoController {
    //@Get('holi')
    //@HttpCode(201)
    //holiGet() {
        //throw new BadRequestException('No envia nada')
        //return 'Hola GET :P'
    //}

    @Post('holi')
    @HttpCode(202)
    holiPost() {
        return 'Hola POST :P'
    }

    @Delete('holi')
    @HttpCode(204)
    @Header('Cache-control', 'none')
    @Header('EPN', 'prueba pruebas')
    holiDelete() {
        return 'Hola DELETE :P'
    }

    //parametros de ruta
    //http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion:altura')
    parametrosRutaEjem(
        @Param() parametrosRuta) {
        console.log('Parametros', parametrosRuta);
        isNaN(parametrosRuta.edad)
        isNaN(parametrosRuta.altura)
        throw new BadRequestException('No son numeros')
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad+altura ;
    }
}