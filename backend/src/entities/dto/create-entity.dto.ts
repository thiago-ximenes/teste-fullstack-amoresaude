import {ApiProperty} from "@nestjs/swagger";
import {ArrayMinSize, IsArray, IsBoolean, IsDateString, IsDefined, IsString, Length} from "class-validator";
import {IsCNPJ} from "../../decorators/IsCNPJ";

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
    @IsDefined()
    @IsString()
    @IsCNPJ()
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
    @ArrayMinSize(5)
    @IsString({
        each: true
    })
    attendedMedicalSpecialties: string[];
}
