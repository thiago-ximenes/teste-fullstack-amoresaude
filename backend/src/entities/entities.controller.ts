import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {EntitiesService} from './entities.service';
import {CreateEntityDto} from './dto/create-entity.dto';
import {UpdateEntityDto} from './dto/update-entity.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {SearchEntityDto} from "./dto/search-entity.dto";

const routeName = 'entities'


@ApiBearerAuth()
@ApiTags(routeName)
@Controller(routeName)
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entitiesService.create(createEntityDto);
  }

  @Get()
  findAll(@Query() searchEntityDto?: SearchEntityDto) {
    return this.entitiesService.findAll(searchEntityDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entitiesService.update(+id, updateEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entitiesService.remove(+id);
  }
}
