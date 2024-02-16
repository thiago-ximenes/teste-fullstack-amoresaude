import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {Public} from "../decorators/Public";

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
}
