import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Regional} from "./entities/regional.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RegionalsService {
    constructor(
        @InjectRepository(Regional)
        private readonly regionalRepository: Repository<Regional>,
    ) {
    }

    async findAll(): Promise<Regional[]> {
        return await this.regionalRepository.find();
    }
}
