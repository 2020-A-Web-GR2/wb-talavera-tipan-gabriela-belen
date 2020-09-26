import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Index([
    'nombre',
    'tipo',
    'numElementos',
    'medio',
    'alcance'
    ]
)

@Entity('ejemplo')
export class RedEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        length: '60',
        nullable:true
    })
    nombre:string

    @Column({
        name: 'tipo',
        type: 'varchar',
        nullable: true
    })
    tipo?: string

    @Column({
        name: 'numElementos',
        nullable: true,
        type: 'integer',
    })
    numElementos?: number;

    @Column({
        name: 'medio',
        type: 'varchar',
        nullable: true
    })
    medio?: string

    @Column({
        name: 'alcance',
        nullable: true,
        type: 'integer',
    })
    alcance?: number;

}