import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {Public} from "../decorators/Public";
import {User} from "../decorators/User";
import {User as UserEntity} from '../users/entities/user.entity'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    singIn(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        return this.authService.signIn(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    @Get('me')
    me(@User() user: UserEntity): Promise<UserEntity> {
        return this.authService.me(user);
    }
}
