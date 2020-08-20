import {Injectable} from "@nestjs/common";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class UsuarioService{
    constructor( //Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>

    ) {
    }
    crearUno(nuevoUsuario:UsuarioEntity ) {
        return this.repositorio.save(nuevoUsuario) //promesas
    }
    buscarTodos(){
        return this.repositorio.find() //promesa
    }
    buscarUno(id:number){
        return this.repositorio.findOne(id) //promesa
    }

    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado);
    }
    eliminarUno(id:number){
        return this.repositorio.delete(id);
    }
//usuario -> mascotas
    //mascota -> vacunas


}