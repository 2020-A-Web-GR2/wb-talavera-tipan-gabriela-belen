import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    Put
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import objectContaining = jasmine.objectContaining;
import {UsuarioCreateDto} from "./dto/usuario.create-dto";
import {UsuarioUpdateDto} from "./dto/usuario.update-dto";

@Controller('usuario')

export class UsuarioController {
    public arregloUsuarios = [{
        id: 1,
        nombre: 'Gab'
    }, {
        id: 2,
        nombre: 'Maty'
    }, {
        id: 3,
        nombre: 'San',
    }
    ]
    public idActual = 3;


    constructor(//inyeccion de dependencias)
     private readonly _usuarioService: UsuarioService
    ){

    }


    @Get()
    async mostrarTodos() {
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error de servidor',
            })
        }
        //return this.arregloUsuarios;
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        const user = new UsuarioCreateDto()
        user.nombre= parametrosCuerpo.nombre
        user.apellido=parametrosCuerpo.apellido
        user.cedula=parametrosCuerpo.cedula
        user.sueldo=parametrosCuerpo.sueldo
        user.fechaNacimiento=parametrosCuerpo.fechaNacimiento

        try{
            // validaciones
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            const msg= 'Su usuario se ha creado correctamente';
            return msg
        }catch (e) {
            console.error(e);
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }


/*
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.idActual + 1
        };
        //return 'ok'
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
*/
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ) {
        let respuesta;
        try {
            respuesta = await this._usuarioService.buscarUno(
                parametrosRuta.id);

        } catch (e) {
            console.error(e);
            throw new BadRequestException({
                mensaje: 'Error del servidor'
            });

            /*        const indice = this.arregloUsuarios.findIndex(
                        (usuario) => usuario.id === Number
                        (parametrosRuta.id)
                    )
                    return this.arregloUsuarios[indice];*/
        }if(respuesta) {
            return respuesta
        }else{
            throw new BadRequestException(
                {mensaje: 'No existen registros',}
            )
        }
    }


    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo

    ){
        const user= new UsuarioUpdateDto()
        user.nombre= parametrosCuerpo.nombre
        user.apellido=parametrosCuerpo.apellido
        user.cedula=parametrosCuerpo.cedula
        user.sueldo=parametrosCuerpo.sueldo
        user.fechaNacimiento=parametrosCuerpo.fechaNacimiento

        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try{
            const respuesta = await this._usuarioService
                .editarUno(usuarioEditado);
            return respuesta;
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }


        /*const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];*/
    }

    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id= Number(parametrosRuta.id);
        try {
            const respuesta= await this._usuarioService
                .eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            }
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            });

        }
 /*       const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];
 */
    }
}

//XML <usuario>GABY</nombre></usuario>
//JSON {"nombre": "GABY"}
//RESTful -JSON
//Ver todos
//http://localhost:3001/
//Get
//RESTful MASCOTA
//http://localhost:3001/mascota se recibe a todas las mascotas

//Ver uno
//http://localhost:3001/mascota/1 se ve a las mascotas con id=1

//Crear Uno
// POST http://localhost:3001/mascota/

//Editar Uno
//PUT http://localhost:3001/mascota/1

//Eliminar uno
//Delete http://localhost:3001/mascota/1
