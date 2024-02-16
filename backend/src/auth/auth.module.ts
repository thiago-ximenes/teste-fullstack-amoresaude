import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthGuard} from "./auth.guard";

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ({
                    global: true,
                    secretOrPrivateKey: configService.get('jwt.secret'),
                })
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthGuard, AuthGuard, JwtModule]
})
export class AuthModule {
}
