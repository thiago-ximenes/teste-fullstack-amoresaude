import {CreateEntityDto} from './create-entity.dto';
import {PartialType} from "@nestjs/swagger";

export class UpdateEntityDto extends PartialType(CreateEntityDto) {
}
