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
let RedController = class RedController {
    constructor(_redService) {
        this._redService = _redService;
    }
    async mostrarTodos() {
        try {
            const respuesta = await this._redService.buscarTodos();
            return respuesta;
        }
        catch (e) {
            console.error(e);
            throw new common_1.InternalServerErrorException({
                mensaje: 'Error del servidor',
            });
        }
    }
    async crearUno(parametrosCuerpo) {
        try {
            const respuesta = await this._redService.crearUno(parametrosCuerpo);
            return respuesta;
        }
        catch (e) {
            console.error(e);
            throw new common_1.BadRequestException({
                mensaje: 'Error validando datos'
            });
        }
    }
    async verUno(parametrosRuta) {
        let respuesta;
        try {
            respuesta = await this._redService
                .buscarUno(Number(parametrosRuta.id));
        }
        catch (e) {
            console.error(e);
            throw new common_1.InternalServerErrorException({
                mensaje: 'Error del servidor',
            });
        }
        if (respuesta) {
            return respuesta;
        }
        else {
            throw new common_1.NotFoundException({
                mensaje: 'No existen registros',
            });
        }
    }
    async editarUno(parametrosRuta, parametrosCuerpo) {
        const id = Number(parametrosRuta.id);
        const redEditada = parametrosCuerpo;
        redEditada.id = id;
        try {
            console.log('redEditado', redEditada);
            const respuesta = await this._redService
                .editarUno(redEditada);
            return respuesta;
        }
        catch (e) {
            console.error(e);
            throw new common_1.InternalServerErrorException({
                mensaje: 'Error del servidor',
            });
        }
    }
    async eliminarUno(parametrosRuta) {
        const id = Number(parametrosRuta.id);
        try {
            const respuesta = await this._redService
                .eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            };
        }
        catch (e) {
            console.error(e);
            throw new common_1.InternalServerErrorException({
                mensaje: 'Error del servidor',
            });
        }
    }
    inicio(res) {
        res.render('red/inicio');
    }
    async crearDesdeVista(parametrosCuerpo, res) {
        let red = new red_create_dto_1.RedCreateDto();
        red.nombre = parametrosCuerpo.nombre;
        red.tipo = parametrosCuerpo.tipo;
        red.numElements = parametrosCuerpo.numElements;
        red.alcance = parametrosCuerpo.alcance;
        red.medio = parametrosCuerpo.medio;
        const tipomedio = `&tipo=${parametrosCuerpo.tipo}&medio=${parametrosCuerpo.medio}`;
        let errores;
        try {
            var mensaje = '';
        }
        catch (e) {
            console.error(e);
            return res.redirect('/usuario/vista/crear?error=Error validadndo datos' + tipomedio);
        }
        if (errores.length > 0) {
            console.error('Error', errores);
            return res.redirect('/usuario/vista/crear?error=Error en los datos' + tipomedio);
        }
        else {
            let respuestaCreacionRed;
            try {
                respuestaCreacionRed = await this._redService.crearUno(parametrosCuerpo);
            }
            catch (error) {
                console.log(error);
                return res.redirect('/red/vista/crear?error=Error creando red' + tipomedio);
            }
            if (respuestaCreacionRed) {
                return res.redirect('/red/vista/inicio');
            }
            else {
                return res.redirect('/red/vista/crear?error=Error creando red' + tipomedio);
            }
        }
    }
    async eliminarDesdeVista(parametrosRuta, res) {
        try {
            const id = Number(parametrosRuta.id);
            await this._redService.eliminarUno(id);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado');
        }
        catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario');
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
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }
        catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RedController.prototype, "mostrarTodos", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "crearUno", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "verUno", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "editarUno", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "eliminarUno", null);
__decorate([
    common_1.Get('vista/inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RedController.prototype, "inicio", null);
__decorate([
    common_1.Post('/crearDesdeVista'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "crearDesdeVista", null);
__decorate([
    common_1.Post('eliminarDesdeVista/:id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RedController.prototype, "eliminarDesdeVista", null);
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