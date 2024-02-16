import {IsDefined, IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @Length(8)
    password: string;

    @IsDefined()
    @IsString()
    name: string;
}
