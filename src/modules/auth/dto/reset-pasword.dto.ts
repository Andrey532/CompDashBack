import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class ResetPasswordDto {

    @ApiProperty({example: "monolit", type: String})
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    oldPassword: string;

    @ApiProperty({example: "svoboda", type: String})
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    newPassword: string;
}