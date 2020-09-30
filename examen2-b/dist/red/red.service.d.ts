import { Repository } from "typeorm";
import { RedEntity } from "./red.entity";
export declare class RedService {
    private repository;
    constructor(repository: Repository<RedEntity>);
    crearUno(nuevaRed: RedEntity): Promise<RedEntity>;
    buscarTodos(): Promise<RedEntity[]>;
    buscarUno(id: number): Promise<RedEntity>;
    editarUno(redEditada: RedEntity): Promise<RedEntity>;
    eliminarUno(id: number): Promise<import("typeorm").DeleteResult>;
}
