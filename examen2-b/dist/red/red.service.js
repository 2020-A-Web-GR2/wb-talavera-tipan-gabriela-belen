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
exports.RedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const red_entity_1 = require("./red.entity");
let RedService = class RedService {
    constructor(repository) {
        this.repository = repository;
    }
    crearUno(nuevaRed) {
        return this.repository.save(nuevaRed);
    }
    buscarTodos(textoConsulta) {
        var valorNumerico;
        if (parseInt(textoConsulta)) {
            valorNumerico = parseInt(textoConsulta);
        }
        if (textoConsulta !== undefined) {
            if (valorNumerico !== undefined) {
                const consulta = {
                    where: [
                        {
                            alcance: typeorm_2.MoreThanOrEqual(parseInt(textoConsulta))
                        }
                    ]
                };
                return this.repository.find(consulta);
            }
            else {
                const consulta = {
                    where: [
                        {
                            tipo: typeorm_2.Like(`%${textoConsulta}%`)
                        }
                    ]
                };
                return this.repository.find(consulta);
            }
        }
        else {
            return this.repository.find();
        }
    }
    buscarUno(id) {
        return this.repository.findOne(id);
    }
    editarUno(redEditada) {
        return this.repository.save(redEditada);
    }
    eliminarUno(id) {
        return this.repository.delete(id);
    }
};
RedService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(red_entity_1.RedEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RedService);
exports.RedService = RedService;
//# sourceMappingURL=red.service.js.map