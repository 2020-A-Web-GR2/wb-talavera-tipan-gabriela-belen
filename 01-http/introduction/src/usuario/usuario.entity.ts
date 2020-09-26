// usuario.entity.ts
import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import {OneToMany} from 'typeorm/index';
import {MascotaEntity} from '../mascota/mascota.entity';

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' // Nombres de las propiedades en la clase
])
// @Index(
//     ['nombre', 'apellido', 'cedula'],
//     {unique: true}
// )
@Entity('ejemplo') // nombre tabla usuario
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula: string;

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, // 1000000000.
        scale: 4, // .0001
    })
    sueldo?: number;

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?: string;
    // Usuario Entity
    @OneToMany(
        type => MascotaEntity,
        // Que entidad nos relacionamos
        mascota => mascota.usuario
        // Campo con el q relacionamos
    )
    mascotas: MascotaEntity[];

}
