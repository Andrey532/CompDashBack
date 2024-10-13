import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCompanyDTO {

  @ApiProperty({ example: "stalker", type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "virovka", type: String })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "world", type: String })
  @IsString()
  @IsNotEmpty()
  service_of_activity: string;

  @ApiProperty({ example: 2, type: Number })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  number_of_employees: number;

  @ApiProperty({ example: "bla bla", type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(120)
  description: string;

  @ApiProperty({ example: "mutant", type: String })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 100, type: Number })
  @IsNumber()
  @IsNotEmpty()
  capital: number

  @ApiProperty({
    example: "http://res.cloudinary.com/drlnqejul/image/upload/v1728836586/lgeyyshn5yywncbr6ozt.png",
    type: String
  })
  @IsNumber()
  @IsNotEmpty()
  logo: string
}