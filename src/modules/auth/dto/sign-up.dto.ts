import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class SignUpDto {

    @ApiProperty({example: "stalker@gmail.com", type: String})
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty({example: "monolit", type: String})
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
  
    @ApiProperty({example: "+380977777777", type: String})
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    phone_number: string;
  
    @ApiProperty({example: "Andrii", type: String})
    @IsString()
    @IsNotEmpty()
    first_name: string;
  
    @ApiProperty({example: "Hrundel", type: String})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({example: ["admin"], type: [String]})
    @IsArray()
    @IsOptional()
    roles?: string[]  
  }