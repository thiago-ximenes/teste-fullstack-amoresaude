import {
    Column, CreateDateColumn,
    Entity as EntityORM,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {Regional} from "../../regionals/entities/regional.entity";
import {
    AttendedMedicalSpecialties
} from "../../attended_medical_specialties/entities/attended_medical_specialties.entity";

@EntityORM()
export class Entity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    corporateName: string;

    @Column()
    tradeName: string;

    @Column({
        unique: true
    })
    cnpj: string;

    @ManyToOne(() => Regional, regional => regional)
    regional: Regional;

    @Column()
    openingDate: Date;

    @Column()
    active: boolean;

    @ManyToMany(() => AttendedMedicalSpecialties, attended_medical_specialties => attended_medical_specialties)
    @JoinTable()
    attendedMedicalSpecialties: AttendedMedicalSpecialties[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
