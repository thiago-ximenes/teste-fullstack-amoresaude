import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGuard} from "./auth.guard";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        forwardRef(() => TokenModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ({
                    global: true,
                    secretOrPrivateKey: configService.get('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.expiresIn')
                    }
                })
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthGuard, AuthGuard, JwtModule, AuthService]
})
export class AuthModule {
}
