import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';

export class SignInDto {
    @ApiProperty({example: "stalker@gmail.com", type: String})
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty({example: "monolit", type: String})
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
}