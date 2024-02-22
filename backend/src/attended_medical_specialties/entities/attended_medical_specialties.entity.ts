import {
    Column,
    CreateDateColumn,
    Entity as EntityORM, JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Entity} from "../../entities/entities/entity.entity";

@EntityORM()
export class AttendedMedicalSpecialties {
    @PrimaryGeneratedColumn('uuid')
    value: string;

    @Column()
    label: string;

    @ManyToMany(() => Entity, entity => entity.attendedMedicalSpecialties)
    @JoinTable({
        name: 'attendedMedicalSpecialtiesEntity',
        joinColumn: {
            name: 'attendedMedicalSpecialtiesId',
            referencedColumnName: 'value'
        },
        inverseJoinColumn: {
            name: 'entityId',
            referencedColumnName: 'id'
        }
    })
    entities: Entity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}