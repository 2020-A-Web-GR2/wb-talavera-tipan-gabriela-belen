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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedEntity = void 0;
const typeorm_1 = require("typeorm");
let RedEntity = class RedEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    }),
    __metadata("design:type", Number)
], RedEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        name: 'nombre',
        type: 'varchar',
        length: '60',
        nullable: true
    }),
    __metadata("design:type", String)
], RedEntity.prototype, "nombre", void 0);
__decorate([
    typeorm_1.Column({
        name: 'tipo',
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], RedEntity.prototype, "tipo", void 0);
__decorate([
    typeorm_1.Column({
        name: 'numElementos',
        nullable: true,
        type: 'integer',
    }),
    __metadata("design:type", Number)
], RedEntity.prototype, "numElementos", void 0);
__decorate([
    typeorm_1.Column({
        name: 'medio',
        type: 'varchar',
        nullable: true
    }),
    __metadata("design:type", String)
], RedEntity.prototype, "medio", void 0);
__decorate([
    typeorm_1.Column({
        name: 'alcance',
        nullable: true,
        type: 'integer',
    }),
    __metadata("design:type", Number)
], RedEntity.prototype, "alcance", void 0);
RedEntity = __decorate([
    typeorm_1.Index([
        'nombre',
        'tipo',
        'numElementos',
        'medio',
        'alcance'
    ]),
    typeorm_1.Entity('examen')
], RedEntity);
exports.RedEntity = RedEntity;
//# sourceMappingURL=red.entity.js.map