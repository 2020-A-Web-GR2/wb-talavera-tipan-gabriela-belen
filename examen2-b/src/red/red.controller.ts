import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post, Put, Query,
    Res, ValidationError
} from "@nestjs/common";
import {RedService} from "./red.service";
import {RedCreateDto} from "./dto/red.create.dto";
import {validate} from "class-validator";
import {RedEntity} from "./red.entity";

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

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        try {
            // Validacion del CREATE DTO
            const respuesta = await this._redService.crearUno(parametrosCuerpo);
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error validando datos'
            });
        }

        // const nuevoUsuario = {
        //     id: this.idActual + 1,
        //     nombre: parametrosCuerpo.nombre
        // };
        // this.arregloUsuarios.push(nuevoUsuario);
        // this.idActual = this.idActual + 1;
        // return nuevoUsuario;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._redService
                .buscarUno(Number(parametrosRuta.id));
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        if (respuesta) {
            return respuesta;
        } else {
            throw new NotFoundException({
                mensaje: 'No existen registros',
            })
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     // (usuario) => usuario.id === Number(parametrosRuta.id)
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // return this.arregloUsuarios[indice];

    }

    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ) {
        const id = Number(parametrosRuta.id);
        const redEditada = parametrosCuerpo;
        redEditada.id = id;
        try {
            console.log('redEditado', redEditada);
            const respuesta = await this._redService
                .editarUno(redEditada);
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
        // const indice = this.arregloUsuarios.findIndex(
        //     // (usuario) => usuario.id === Number(parametrosRuta.id)
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // );
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        // return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ) {
        const id = Number(parametrosRuta.id);
        try {
            const respuesta = await this._redService
                .eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            };
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }
    }


    @Get('vista/inicio')
    inicio(
        @Res() res
    ) {

        res.render('red/inicio')
    }

    @Post('/crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        let red = new RedCreateDto();
        red.nombre = parametrosCuerpo.nombre;
        red.tipo = parametrosCuerpo.tipo;
        red.numElements = parametrosCuerpo.numElements;
        red.alcance = parametrosCuerpo.alcance;
        red.medio= parametrosCuerpo.medio;

        const tipomedio = `&tipo=${parametrosCuerpo.tipo}&medio=${parametrosCuerpo.medio}`
        let errores: ValidationError[]
        try{
            //errores = await validate(red);
            var mensaje = '';
        }catch (e) {
            console.error(e)
            return res.redirect('/usuario/vista/crear?error=Error validadndo datos' + tipomedio);
        }

        if (errores.length > 0) {
            console.error('Error', errores);
            return res.redirect('/usuario/vista/crear?error=Error en los datos' + tipomedio);
        }else{
            let respuestaCreacionRed
            try{
                respuestaCreacionRed = await this._redService.crearUno(parametrosCuerpo)
            } catch (error) {
                console.log(error);
                return res.redirect('/red/vista/crear?error=Error creando red' + tipomedio );
            }
            if(respuestaCreacionRed){
                return res.redirect('/red/vista/inicio')
            } else {
                return res.redirect('/red/vista/crear?error=Error creando red' + tipomedio);
            }
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._redService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
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
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');
        }
        // let usuarioEditado = new UsuarioEntity();
        // usuarioEditado.id = parametrosRuta.id.toInt()
        // usuarioEditado.nombre = parametrosCuerpo.nombre;
        // usuarioEditado.apellido = parametrosCuerpo.apellido;
        // usuarioEditado.cedula = parametrosCuerpo.cedula;
        // usuarioEditado.sueldo = parametrosCuerpo.sueldo;
        // usuarioEditado.fechaNacimiento = parametrosCuerpo.fechaNacimiento;
        // usuarioEditado.fechaHoraNacimiento = parametrosCuerpo.fechaHoraNacimiento;
        // usuarioEditado.mascotas = parametrosCuerpo.mascotas;
        // let usuario:UsuarioUpdateDto = usuarioEditado
        // let nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
        // let cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
        // let errores: ValidationError[]
        // try{
        //     errores = await validate(usuario);
        //     var mensaje = '';
        // }catch (e) {
        //     console.error(e)
        //     return res.redirect('/usuario/vista/crear?error=Error validadndo datos' + nombreApellidoConsulta);
        // }
        //
        // if (errores.length > 0) {
        //     console.error('Error', errores);
        //     return res.redirect('/usuario/vista/crear?error=Error en los datos' + nombreApellidoConsulta);
        // }else{
        //     let respuestaEditarUsuario
        //     try{
        //         respuestaEditarUsuario = await this._UsuarioService.editarUno(usuarioEditado)
        //     } catch (error) {
        //         console.log(error);
        //         return res.redirect('/usuario/vista/crear?error=Error creando usuario' + nombreApellidoConsulta + cedulaConsulta);
        //     }
        //     if(respuestaEditarUsuario){
        //         return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado.')
        //     } else {
        //         return res.redirect('/usuario/vista/crear?error=Error creando usuario' + nombreApellidoConsulta + cedulaConsulta);
        //     }
        // }
    }

}