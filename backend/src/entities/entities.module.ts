import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Entity} from "./entities/entity.entity";
import {Regional} from "../regionals/entities/regional.entity";
import {AttendedMedicalSpecialties} from "../attended_medical_specialties/entities/attended_medical_specialties.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Entity, Regional, AttendedMedicalSpecialties])],
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
