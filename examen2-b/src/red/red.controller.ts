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
import {RedUpdateDto} from "./dto/red.update.dto";


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
        } else {
            return res.redirect('red/login')
        }
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
                    numElementos: parametrosConsulta.numElementos,
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
        red.numElementos = Number(parametrosCuerpo.numElementos);
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
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElementos=${parametrosCuerpo.numElementos}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
                }
                if (respuestaCrearRed) {
                    return res.redirect('inicio')
                } else {
                    const mensajeError = 'CREANDO DEPARTAMENTO 2'
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElementos=${parametrosCuerpo.numElementos}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
                }
            } else {
                const mensajeError = 'Datos incorrectos'
                return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElementos=${parametrosCuerpo.numElementos}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
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
            return res.redirect('/red/inicio?mensaje= Accion completada exitosamente')
        } catch (error) {
            console.log(error);
            return res.redirect('/red/inicio?error=Error al eliminar el registro')
        }

    }

    @Get('editar/:id')
    async vistaEditarRed(
        @Param() parametrosRuta,
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            const id = Number(parametrosRuta.id)
            let resultadoEncontrado;
            try {
                resultadoEncontrado = await this._redService.buscarUno(id);
            } catch (error) {
                console.error('Error del servidor');
                return res.redirect('/red/inicio?mensaje=Error buscando redes');
            }
            if (resultadoEncontrado) {
                return res.render(
                    'red/crear',
                    {
                        error: parametrosConsulta.error,
                        red: resultadoEncontrado,
                        usuario: session.usuario,
                        roles: session.roles
                    }
                )
            } else {
                return res.redirect('/red/inicio?mensaje= Red no encontrada')
            }
        } else {
            return res.redirect('/login')
        }

    }

    @Post('editar/:id')
    async editarRed(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const red = new RedUpdateDto();
        red.nombre = parametrosCuerpo.nombre;
        red.tipo = parametrosCuerpo.tipo;
        red.numElementos = Number(parametrosCuerpo.numElementos);
        red.medio = parametrosCuerpo.medio
        red.alcance = Number(parametrosCuerpo.alcance)
        try {
            const errores: ValidationError[] = await validate(red)
            if (errores.length == 0) {
                const redEditada = {
                    id: Number(parametrosRuta.id),
                    nombre: parametrosCuerpo.nombre,
                    tipo: parametrosCuerpo.tipo,
                    numElementos: Number(parametrosCuerpo.numElementos),
                    medio: parametrosCuerpo.medio,
                    alcance: Number(parametrosCuerpo.alcance)
                } as RedEntity
                try {
                    await this._redService.editarUno(redEditada);
                    return res.redirect('/red/inicio?mensaje=Red editada con exito');
                }catch (error) {
                    console.error(error);
                    return res.redirect('/red/inicio?mensaje=Error en la edicion de datos');
                }
            } else {
                const mensajeError = 'Datos Incorrectos'
                return res.redirect('/red/editar/'+parametrosRuta.id+'?error=' + mensajeError);
            }
        } catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }

}