import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsDateString, IsDefined, IsNumber, IsString, Length} from "class-validator";

export class CreateEntityDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @Length(1, 10)
    corporateName: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    tradeName: string;


    @ApiProperty()
    @Length(14, 14)
    @IsString()
    cnpj: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    regionalId: string;

    @ApiProperty()
    @IsDefined()
    @IsDateString()
    openingDate: Date;

    @ApiProperty()
    @IsDefined()
    @IsBoolean()
    active: boolean;

    @ApiProperty()
    @IsDefined()
    @IsArray()
    @IsString({
        each: true
    })
    attendedMedicalSpecialties: string[];
}
