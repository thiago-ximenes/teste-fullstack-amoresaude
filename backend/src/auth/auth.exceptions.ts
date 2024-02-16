import authConstants from "./auth.constants";
import {UnauthorizedException} from "@nestjs/common";

export class AuthExceptions {
    static invalidCredentials = () => new UnauthorizedException(authConstants.invalidCredentials);
}