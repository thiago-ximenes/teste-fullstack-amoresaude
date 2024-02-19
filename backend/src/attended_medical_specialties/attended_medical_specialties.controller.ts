import {Controller, Get} from '@nestjs/common';
import {AttendedMedicalSpecialtiesService} from './attended_medical_specialties.service';

@Controller('attended-medical-specialties')
export class AttendedMedicalSpecialtiesController {
    constructor(private readonly attendedMedicalSpecialtiesService: AttendedMedicalSpecialtiesService) {
    }

    @Get('/')
    async findAll() {
        return await this.attendedMedicalSpecialtiesService.findAll();
    }
}
