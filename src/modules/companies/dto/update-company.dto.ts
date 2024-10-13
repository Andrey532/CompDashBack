import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDTO } from './create-company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';


export class UpdateCompanyDTO {

    @ApiProperty({ example: "stalker2", type: String })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: "Sumy", type: String })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string;

    @ApiProperty({ example: "usa", type: String })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    service_of_activity?: string;

    @ApiProperty({ example: 1, type: Number })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @IsOptional()
    number_of_employees?: number;

    @ApiProperty({ example: "bla bla bla", type: String })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(120)
    @IsOptional()
    description?: string;

    @ApiProperty({ example: "krovosos", type: String })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type?: string;

    @ApiProperty({ example: 1000, type: Number })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    capital?: number

    @ApiProperty({
        example: "http://res.cloudinary.com/drlnqejul/image/upload/v1728836586/lgeyyshn5yywncbr6ozt777.png",
        type: String
    })
    @IsNumber()
    @IsNotEmpty()
    logo: string
}
