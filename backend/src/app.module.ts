import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import databaseConfig from "./config/database.config";
import {User} from "./users/entities/user.entity";
import jwtConfig from "./config/jwt.config";
import {AuthGuard} from "./auth/auth.guard";
import { EntitiesModule } from './entities/entities.module';
import { RegionalsModule } from './regionals/regionals.module';
import { AttendedMedicalSpecialtiesModule } from './attended_medical_specialties/attended_medical_specialties.module';
import authConstants from "./auth/auth.constants";
import {Entity} from "./entities/entities/entity.entity";
import {Regional} from "./regionals/entities/regional.entity";
import {AttendedMedicalSpecialties} from "./attended_medical_specialties/entities/attended_medical_specialties.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, jwtConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (_configService: ConfigService) => ({
                type: 'mysql',
                entities: [
                    User,
                    Entity,
                    Regional,
                    AttendedMedicalSpecialties,
                ],
                database: _configService.get('database.database')!,
                host: _configService.get('database.host'),
                port: _configService.get('database.port'),
                username: _configService.get('database.username'),
                password: _configService.get('database.password')!,
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
            }),
        }),
        AuthModule,
        UsersModule,
        EntitiesModule,
        RegionalsModule,
        AttendedMedicalSpecialtiesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: authConstants.appGuard,
            useClass: AuthGuard,
        }
    ],
})
export class AppModule {
}
