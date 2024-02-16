import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import databaseConfig from "./config/database.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (_configService: ConfigService) => ({
                type: 'mysql',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                host: _configService.get('database.host'),
                port: _configService.get('database.port'),
                username: _configService.get('database.username'),
                password: _configService.get('database.password')!,
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
