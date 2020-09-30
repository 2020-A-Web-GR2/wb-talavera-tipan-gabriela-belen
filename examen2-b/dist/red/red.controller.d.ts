import { RedService } from "./red.service";
import { RedEntity } from "./red.entity";
export declare class RedController {
    private readonly _redService;
    constructor(_redService: RedService);
    mostrarTodos(): Promise<RedEntity[]>;
    crearUno(parametrosCuerpo: any): Promise<RedEntity>;
    verUno(parametrosRuta: any): Promise<any>;
    editarUno(parametrosRuta: any, parametrosCuerpo: any): Promise<RedEntity>;
    eliminarUno(parametrosRuta: any): Promise<{
        mensaje: string;
    }>;
    inicio(res: any): void;
    crearDesdeVista(parametrosCuerpo: any, res: any): Promise<any>;
    eliminarDesdeVista(parametrosRuta: any, res: any): Promise<any>;
    editarDesdeVista(parametrosRuta: any, parametrosCuerpo: any, res: any): Promise<any>;
}
