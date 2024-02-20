import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {RegionalsService} from './regionals.service';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('regionals')
@Controller('regionals')
export class RegionalsController {
    constructor(private readonly regionalsService: RegionalsService) {
    }


    @HttpCode(HttpStatus.OK)
    @Get('/')
    async findAll() {
        return await this.regionalsService.findAll();
    }
}
