import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
      IsNotEmpty,
      IsOptional,
      IsString,
    } from 'class-validator';
    
    export class UpdateUsersDto {
      @ApiProperty({example: "Evgen", type: String})
      @IsString()
      @IsNotEmpty()
      @IsOptional()
      first_name?: string;
    
      @ApiProperty({example: "Hmuriy", type: String})
      @IsString()
      @IsNotEmpty()
      @IsOptional()
      last_name?: string;
  
      @ApiProperty({example: ["super-admin"], type: [String]})
      @IsArray()
      @IsOptional()
      roles?: string[]  
    }