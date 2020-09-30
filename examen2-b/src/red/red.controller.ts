import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post, Query,
    Res, Session
} from "@nestjs/common";
import {RedService} from "./red.service";
import {RedCreateDto} from "./dto/red.create.dto";
import {RedEntity} from "./red.entity";
import {validate, ValidationError} from "class-validator";


@Controller('red')
export class RedController {
    constructor( // Inyección de dependencias
        private readonly _redService: RedService,
    ) {
    }

    @Get('inicio')
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoEncontrado
            try {
                resultadoEncontrado = await this._redService.buscarTodos(parametrosConsulta.busqueda);
            } catch (error) {
                throw  new InternalServerErrorException('Error encontrando red')
            }
            if (resultadoEncontrado) {
                res.render(
                    'red/inicio',
                    {
                        redes: resultadoEncontrado,
                        parametrosConsulta: parametrosConsulta,
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )
            } else {
                throw new NotFoundException('No se encontraron redes')
            }
        } /*else {
            return res.redirect('red/login')
        }*/
    }

    @Get('login')
    login(
        @Res() res
    ) {

        res.render('red/login')
    }

    @Get('crear') // Controlador
    VistaCrearRed(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return res.render(
                'red/crear',
                {
                    error: parametrosConsulta.error,
                    nombre: parametrosConsulta.nombre,
                    tipo: parametrosConsulta.tipo,
                    numElements: parametrosConsulta.numElements,
                    medio: parametrosConsulta.medio,
                    alcance: parametrosConsulta.alcance,
                    usuario: session.usuario,
                    roles: session.roles
                }
            )
        } else {
            return res.redirect('/login')
        }
    }

    @Post('crear')
    async crearRed(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const red = new RedCreateDto();
        red.nombre = parametrosCuerpo.nombre;
        red.tipo = parametrosCuerpo.tipo;
        red.numElements = Number(parametrosCuerpo.numElements);
        red.medio = parametrosCuerpo.medio;
        red.alcance = Number(parametrosCuerpo.alcance);
        //const tipomedio = `&tipo=${parametrosCuerpo.tipo}&medio=${parametrosCuerpo.medio}`

        try {
            const errores: ValidationError[] = await validate(red);
            if (errores.length == 0) {
                let respuestaCrearRed;
                try {
                    respuestaCrearRed = await this._redService.crearUno(parametrosCuerpo);
                } catch (error) {
                    console.error(error);
                    const mensajeError = 'CREANDO DEPARTAMENTO 1'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElements=${parametrosCuerpo.numElements}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
                }
                if (respuestaCrearRed) {
                    return res.redirect('inicio')
                } else {
                    const mensajeError = 'CREANDO DEPARTAMENTO 2'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElements=${parametrosCuerpo.numElements}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
                }
            } else {
                const mensajeError = 'Datos incorrectos'
                return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElements=${parametrosCuerpo.numElements}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
            }
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }


    @Post('eliminarDesdeVista/:id')
    async eliminarRed(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._redService.eliminarUno(id)
            return res.redirect('/red/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/red/inicio?error=Error eliminando usuario')
        }

    }

    @Post('/editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const redEditada = {
            id: Number(parametrosRuta.id),
            medio: parametrosCuerpo.medio,
            tipo: parametrosCuerpo.tipo,
            // cedula: parametrosCuerpo.cedula,
        } as RedEntity;
        try {
            await this._redService.editarUno(redEditada);
            return res.redirect('/red/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/red/inicio?mensaje=Error editando usuario');
        }

    }

}