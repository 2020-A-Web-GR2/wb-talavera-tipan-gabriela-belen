import { RedService } from "./red.service";
export declare class RedController {
    private readonly _redService;
    constructor(_redService: RedService);
    inicio(res: any, parametrosConsulta: any, session: any): Promise<void>;
    login(res: any): void;
    VistaCrearRed(parametrosConsulta: any, res: any, session: any): any;
    crearRed(parametrosCuerpo: any, res: any): Promise<any>;
    eliminarRed(parametrosRuta: any, res: any): Promise<any>;
    editarDesdeVista(parametrosRuta: any, parametrosCuerpo: any, res: any): Promise<any>;
}
