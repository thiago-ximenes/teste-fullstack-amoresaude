import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcryptjs';
import {AuthExceptions} from "./auth.exceptions";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";
import {User} from "../users/entities/user.entity";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => TokenService))
        private readonly tokenService: TokenService
    ) {
    }

    signIn = async (loginDto: LoginDto): Promise<{ access_token: string }> => {
        const user = await this.userService.findOneByEmail(loginDto.email);

        if (!user) {
            throw AuthExceptions.invalidCredentials()
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw AuthExceptions.invalidCredentials()
        }

        return this.login(user);
    }

    async login(user: User) {
        const token = this.jwtService.sign({...user, password: undefined});

        await this.tokenService.save({
            user,
            hash: token
        })

        return {
            access_token: token
        }
    }

    me = async (user: User) => {
        return user;
    }
}
