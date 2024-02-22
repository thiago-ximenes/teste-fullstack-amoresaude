import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        length: 500
    })
    hash: string;

    @ManyToOne(() => User, user => user)
    user: User;
}
