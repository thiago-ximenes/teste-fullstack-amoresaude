import {Injectable} from '@nestjs/common';
import {CreateEntityDto} from './dto/create-entity.dto';
import {UpdateEntityDto} from './dto/update-entity.dto';
import {In, Not, Repository} from "typeorm";
import {Entity} from "./entities/entity.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Regional} from "../regionals/entities/regional.entity";
import {AttendedMedicalSpecialties} from "../attended_medical_specialties/entities/attended_medical_specialties.entity";
import {EntitiesExceptions} from "./entities.exceptions";
import {SearchEntityDto} from "./dto/search-entity.dto";

@Injectable()
export class EntitiesService {
    constructor(
        @InjectRepository(Entity)
        private readonly entitiesRepository: Repository<Entity>,
        @InjectRepository(Regional)
        private readonly regionalRepository: Repository<Regional>,
        @InjectRepository(AttendedMedicalSpecialties)
        private readonly attendedMedicalSpecialtiesRepository: Repository<AttendedMedicalSpecialties>,
    ) {
    }

    async create(createEntityDto: CreateEntityDto) {
        const entity = this.entitiesRepository.create()

        return this.saveEntity(entity, createEntityDto)
    }

    async findAll(searchEntityDto?: SearchEntityDto) {
        const {search, page} = searchEntityDto || {}

        const take =  10;

        const [entities, length] = await this.entitiesRepository.findAndCount({
            relations: ['regional', 'attendedMedicalSpecialties'],
            skip: page ? +page * take : undefined,
            take,
            where: search ? [
                {corporateName: search},
                {tradeName: search},
                {
                    attendedMedicalSpecialties: {
                        label: search
                    }
                }
            ] : undefined
        })

        return {
            entities,
            length,
            page: page ? +page : 0,
        }
    }

    findOne(id: number) {
        return this.entitiesRepository.findOne({
            where: {id},
            relations: ['regional', 'attendedMedicalSpecialties']
        },)
    }

    async update(id: number, updateEntityDto: UpdateEntityDto) {
        const entity = await this.findOne(id)

        return this.saveEntity(entity, updateEntityDto)
    }

    remove(id: number) {
        return this.entitiesRepository.delete(id)
    }

    async saveEntity(entity: Entity, data: UpdateEntityDto | CreateEntityDto) {
        await this.throwForDuplicateCnpj(data.cnpj, entity.id)

        const {regionalId, attendedMedicalSpecialties, ...updatedEntity} = data

        const regional = await this.regionalRepository.findOneBy({
            value: regionalId
        })

        if (!regional) {
            throw EntitiesExceptions.regionalNotFound()
        }

        const attendedMedicalSpecialtiesEntities = await this.attendedMedicalSpecialtiesRepository.find({
            where: {
                value: In(attendedMedicalSpecialties)
            }
        })

        if (attendedMedicalSpecialtiesEntities.length !== attendedMedicalSpecialties.length) {
            throw EntitiesExceptions.attendedMedicalSpecialtiesNotFound()
        }

        entity.regional = regional
        entity.attendedMedicalSpecialties = attendedMedicalSpecialtiesEntities
        Object.assign(entity, updatedEntity)

        return this.entitiesRepository.save(entity)
    }

    async throwForDuplicateCnpj(cnpj: string, entityId?: number) {
        if (!cnpj) {
            return
        }

        const duplicatedCnpj = await this.entitiesRepository.findOneBy({cnpj, id: entityId ? Not(entityId) : undefined})


        if (duplicatedCnpj) {
            throw EntitiesExceptions.duplicatedCnpj()
        }
    }
}
