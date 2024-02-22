import {forwardRef, Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {TokenController} from './token.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Token} from "./entities/token.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Token]),
        forwardRef(() => AuthModule),
    ],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {
}
