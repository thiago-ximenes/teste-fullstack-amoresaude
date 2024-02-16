import {BadRequestException} from "@nestjs/common";
import usersConstants from "./users.constants";

export class UsersExceptions {
    static readonly EmailAlreadyExists = new BadRequestException(usersConstants.emailAlreadyExists)
}