import {
    IsArray,
      IsNotEmpty,
      IsOptional,
      IsString,
    } from 'class-validator';
    
    export class UpdateUsersDto {
      @IsString()
      @IsNotEmpty()
      @IsOptional()
      first_name?: string;
    
      @IsString()
      @IsNotEmpty()
      @IsOptional()
      last_name?: string;
  
      @IsArray()
      @IsOptional()
      roles?: string[]  
    }