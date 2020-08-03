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
        return this.repositorio.save(nuevoUsuario)
    }

}