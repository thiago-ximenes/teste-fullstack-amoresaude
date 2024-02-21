import {
    Column,
    CreateDateColumn,
    Entity as EntityORM,
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
    entities: Entity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}