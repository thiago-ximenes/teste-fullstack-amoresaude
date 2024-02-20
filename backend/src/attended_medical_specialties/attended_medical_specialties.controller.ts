import {Controller, Get} from '@nestjs/common';
import {AttendedMedicalSpecialtiesService} from './attended_medical_specialties.service';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

const routeName = 'attended-medical-specialties'

@ApiBearerAuth()
@ApiTags(routeName)
@Controller(routeName)
export class AttendedMedicalSpecialtiesController {
    constructor(private readonly attendedMedicalSpecialtiesService: AttendedMedicalSpecialtiesService) {
    }

    @Get('/')
    async findAll() {
        return await this.attendedMedicalSpecialtiesService.findAll();
    }
}
