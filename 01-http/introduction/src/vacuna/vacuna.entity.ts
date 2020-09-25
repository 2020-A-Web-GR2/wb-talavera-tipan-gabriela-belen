import {Entity} from 'typeorm';
import {Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm/index';
import {UsuarioEntity} from '../usuario/usuario.entity';
import {MascotaEntity} from '../mascota/mascota.entity';

@Entity()
export class VacunaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => MascotaEntity,
        mascota => mascota.vacunas
    )
    mascota: MascotaEntity;
}
