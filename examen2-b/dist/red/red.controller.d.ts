import { RedService } from "./red.service";
export declare class RedController {
    private readonly _redService;
    constructor(_redService: RedService);
    inicio(res: any, parametrosConsulta: any, session: any): Promise<any>;
    login(res: any): void;
    VistaCrearRed(parametrosConsulta: any, res: any, session: any): any;
    crearRed(parametrosCuerpo: any, res: any): Promise<any>;
    eliminarRed(parametrosRuta: any, res: any): Promise<any>;
    vistaEditarRed(parametrosRuta: any, parametrosConsulta: any, res: any, session: any): Promise<any>;
    editarRed(parametrosRuta: any, parametrosCuerpo: any, res: any): Promise<any>;
}
