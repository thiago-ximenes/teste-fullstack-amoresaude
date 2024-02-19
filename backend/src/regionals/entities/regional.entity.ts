import {Column, Entity as EntityORM, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Entity} from "../../entities/entities/entity.entity";

@EntityORM()
export class Regional {
    @PrimaryGeneratedColumn('uuid')
    value: string;

    @Column()
    label: string;
}