import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {EntitiesService} from './entities.service';
import {CreateEntityDto} from './dto/create-entity.dto';
import {UpdateEntityDto} from './dto/update-entity.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

const routeName = 'entities'


@ApiBearerAuth()
@ApiTags(routeName)
@Controller(routeName)
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {
    return this.entitiesService.create(createEntityDto);
  }

  @Get()
  findAll() {
    return this.entitiesService.findAll();
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
