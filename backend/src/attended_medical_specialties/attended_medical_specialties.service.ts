import { Injectable } from '@nestjs/common';
import {AttendedMedicalSpecialties} from "./entities/attended_medical_specialties.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AttendedMedicalSpecialtiesService {
    constructor(
        @InjectRepository(AttendedMedicalSpecialties)
        private readonly attendedMedicalSpecialtiesRepository: Repository<AttendedMedicalSpecialties>
    ) {
    }

    async findAll(): Promise<AttendedMedicalSpecialties[]> {
        return await this.attendedMedicalSpecialtiesRepository.find();
    }
}
