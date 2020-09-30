import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, MoreThanOrEqual, Repository} from "typeorm";
import {RedEntity} from "./red.entity";

@Injectable()
export class RedService {
    constructor(
        @InjectRepository(RedEntity)
        private repository: Repository<RedEntity>
    ) {
    }

    crearUno(nuevaRed: RedEntity) {
        return this.repository.save(nuevaRed) // promesa
    }

    buscarTodos(textoConsulta?:string) {
        let valorNumerico: number;
        if(parseInt(textoConsulta)){valorNumerico = parseInt(textoConsulta)}
        if(textoConsulta !== undefined) {
            if(valorNumerico !== undefined) {
                const consulta: FindManyOptions<RedEntity> = {
                    where: [
                        {
                            alcance: MoreThanOrEqual(parseInt(textoConsulta))
                        }
                    ]
                }
                return this.repository.find(consulta)
            }else{
                const consulta: FindManyOptions<RedEntity> = {
                    where: [
                        {
                            tipo: Like(`%${textoConsulta}%`)
                        }
                    ]
                }
                return this.repository.find(consulta)
            }
        }else{
            return this.repository.find()
        }//Promesa
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