import {Column, CreateDateColumn, Entity as EntityORM, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@EntityORM()
export class Regional {
    @PrimaryGeneratedColumn('uuid')
    value: string;

    @Column()
    label: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}