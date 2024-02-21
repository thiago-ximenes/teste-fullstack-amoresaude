import {BadRequestException} from "@nestjs/common";

export class EntitiesExceptions {
    static regionalNotFound() {
        throw new BadRequestException('Regional não encontrada')
    }

    static duplicatedCnpj() {
        throw new BadRequestException('CNPJ já cadastrado')
    }

    static attendedMedicalSpecialtiesNotFound() {
        throw new BadRequestException('Especialidades médicas não encontradas')
    }
}