import { Module } from '@nestjs/common';
import { AttendedMedicalSpecialtiesService } from './attended_medical_specialties.service';
import { AttendedMedicalSpecialtiesController } from './attended_medical_specialties.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AttendedMedicalSpecialties} from "./entities/attended_medical_specialties.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AttendedMedicalSpecialties])],
  controllers: [AttendedMedicalSpecialtiesController],
  providers: [AttendedMedicalSpecialtiesService],
})
export class AttendedMedicalSpecialtiesModule {}
