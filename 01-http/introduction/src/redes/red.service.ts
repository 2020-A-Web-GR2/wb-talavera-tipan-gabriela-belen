import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RedEntity} from "./red.entity";

@Injectable()
export class RedService {
    constructor(
        @InjectRepository(RedService)
        private repository: Repository<RedEntity>
    ) {
    }

    crearUno(nuevaRed: RedEntity) {
        return this.repository.save(nuevaRed) // promesa
    }

    buscarTodos() {
        return this.repository.find() // promesa
    }

    buscarUno(id: number) {
        return this.repository.findOne(id) // promesa
    }

    editarUno(redEditada: RedEntity) {
        return this.repository.save(redEditada);
    }

    eliminarUno(id: number) {
        return this.repository.delete(id);
    }
}
//