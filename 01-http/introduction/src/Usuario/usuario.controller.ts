import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

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


    @Get()
    mostrarTodos() {
        return this.arregloUsuarios;
    }

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ) {
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.idActual + 1
        };
        //return 'ok'
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ) {
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];
            }
    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo

    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number
            (parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice, 1);
        return this.arregloUsuarios[indice];
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
