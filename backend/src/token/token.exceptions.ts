import {UnauthorizedException} from "@nestjs/common";

export class TokenExceptions {
    static invalidToken() {
        return new UnauthorizedException('Token Invalido')
    }
}