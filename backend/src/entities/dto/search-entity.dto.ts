import {IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class SearchEntityDto {
    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    page?: string;
}