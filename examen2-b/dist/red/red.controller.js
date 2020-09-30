"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedController = void 0;
const common_1 = require("@nestjs/common");
const red_service_1 = require("./red.service");
const red_create_dto_1 = require("./dto/red.create.dto");
const class_validator_1 = require("class-validator");
let RedController = class RedController {
    constructor(_redService) {
        this._redService = _redService;
    }
    async inicio(res, parametrosConsulta, session) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            let resultadoEncontrado;
            try {
                resultadoEncontrado = await this._redService.buscarTodos(parametrosConsulta.busqueda);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Error encontrando red');
            }
            if (resultadoEncontrado) {
                res.render('red/inicio', {
                    redes: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta,
                    usuario: session.usuario,
                    roles: session.roles
                });
            }
            else {
                throw new common_1.NotFoundException('No se encontraron redes');
            }
        }
    }
    login(res) {
        res.render('red/login');
    }
    VistaCrearRed(parametrosConsulta, res, session) {
        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return res.render('red/crear', {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                tipo: parametrosConsulta.tipo,
                numElements: parametrosConsulta.numElements,
                medio: parametrosConsulta.medio,
                alcance: parametrosConsulta.alcance,
                usuario: session.usuario,
                roles: session.roles
            });
        }
        else {
            return res.redirect('/login');
        }
    }
    async crearRed(parametrosCuerpo, res) {
        const red = new red_create_dto_1.RedCreateDto();
        red.nombre = parametrosCuerpo.nombre;
        red.tipo = parametrosCuerpo.tipo;
        red.numElements = Number(parametrosCuerpo.numElements);
        red.medio = parametrosCuerpo.medio;
        red.alcance = Number(parametrosCuerpo.alcance);
        try {
            const errores = await class_validator_1.validate(red);
            if (errores.length == 0) {
                let respuestaCrearRed;
                try {
                    respuestaCrearRed = await this._redService.crearUno(parametrosCuerpo);
                }
                catch (error) {
                    console.error(error);
                    const mensajeError = 'CREANDO DEPARTAMENTO 1';
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElements=${parametrosCuerpo.numElements}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
                }
                if (respuestaCrearRed) {
                    return res.redirect('inicio');
                }
                else {
                    const mensajeError = 'CREANDO DEPARTAMENTO 2';
                    return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElements=${parametrosCuerpo.numElements}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
                }
            }
            else {
                const mensajeError = 'Datos incorrectos';
                return res.redirect('crear?error=' + mensajeError + `&nombre=${parametrosCuerpo.nombre}&tipo=${parametrosCuerpo.tipo}&numElements=${parametrosCuerpo.numElements}&medio=${parametrosCuerpo.medio}&alcance=${parametrosCuerpo.alcance}`);
            }
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }
    async eliminarRed(parametrosRuta, res) {
        try {
            const id = Number(parametrosRuta.id);
            await this._redService.eliminarUno(id);
            return res.redirect('/red/inicio?mensaje=Usuario eliminado');
        }
        catch (error) {
            console.log(error);
            return res.redirect('/red/inicio?error=Error eliminando usuario');
        }
    }
    async editarDesdeVista(parametrosRuta, parametrosCuerpo, res) {
        const redEditada = {
            id: Number(parametrosRuta.id),
            medio: parametrosCuerpo.medio,
            tipo: parametrosCuerpo.tipo,
        };
        try {
            await this._redService.editarUno(redEditada);
            return res.redirect('/red/inicio?mensaje=Usuario editado');
        }
        catch (error) {
            console.error(error);
            return res.redirect('/red/inicio?mensaje=Error editando usuario');
        }
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "inicio", null);
__decorate([
    common_1.Get('login'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RedController.prototype, "login", null);
__decorate([
    common_1.Get('crear'),
    __param(0, common_1.Query()),
    __param(1, common_1.Res()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], RedController.prototype, "VistaCrearRed", null);
__decorate([
    common_1.Post('crear'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "crearRed", null);
__decorate([
    common_1.Post('eliminarDesdeVista/:id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "eliminarRed", null);
__decorate([
    common_1.Post('/editarDesdeVista/:id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "editarDesdeVista", null);
RedController = __decorate([
    common_1.Controller('red'),
    __metadata("design:paramtypes", [red_service_1.RedService])
], RedController);
exports.RedController = RedController;
//# sourceMappingURL=red.controller.js.map