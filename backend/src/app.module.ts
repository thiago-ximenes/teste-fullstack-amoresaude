import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import {AuthGuard} from "./auth/auth.guard";
import {EntitiesModule} from './entities/entities.module';
import {RegionalsModule} from './regionals/regionals.module';
import {AttendedMedicalSpecialtiesModule} from './attended_medical_specialties/attended_medical_specialties.module';
import authConstants from "./auth/auth.constants";

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
                entities: [`${__dirname}/**/*.entity{.ts,.js}`],
                database: _configService.get('database.database')!,
                host: _configService.get('database.host'),
                port: _configService.get('database.port'),
                username: _configService.get('database.username'),
                password: _configService.get('database.password')!,
                synchronize: true,
                autoLoadEntities: true,
                migrations: [`${__dirname}/migrations/*{.ts,.js}`],
                migrationsRun: true,
            }),
        }),
        forwardRef(() => AuthModule),
        UsersModule,
        EntitiesModule,
        RegionalsModule,
        AttendedMedicalSpecialtiesModule,
    ],
    providers: [
        {
            provide: authConstants.appGuard,
            useClass: AuthGuard,
        }
    ],
})
export class AppModule {
}
