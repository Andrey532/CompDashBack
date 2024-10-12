import {
  IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class SignUpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    phone_number: string;
  
    @IsString()
    @IsNotEmpty()
    first_name: string;
  
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsArray()
    @IsOptional()
    roles?: string[]  
  }