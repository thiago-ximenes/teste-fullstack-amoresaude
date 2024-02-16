import {IsDefined, IsEmail, IsString} from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    password: string;

    @IsDefined()
    @IsString()
    name: string;
}
