import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    login(response: any): any;
    loginPost(parametrosConsulta: any, response: any, session: any): any;
    logout(session: any, response: any, request: any): any;
}
