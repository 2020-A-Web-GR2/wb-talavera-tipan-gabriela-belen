import {Entity} from 'typeorm';
import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm/index';
import {UsuarioEntity} from '../usuario/usuario.entity';
import {VacunaEntity} from '../vacuna/vacuna.entity';

@Entity()
export class MascotaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity,
        // Que entidad nos relacionamos
        usuario => usuario.mascotas
        // Campo con el q relacionamos
    )
    usuario: UsuarioEntity;

    @OneToMany(
        type => VacunaEntity,
        vacuna => vacuna.mascota
    )
    vacunas: VacunaEntity[];

}
