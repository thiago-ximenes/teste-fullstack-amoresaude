import {User} from "../../users/entities/user.entity";

export class CreateTokenDto {
    hash: string;
    user: User;
}
