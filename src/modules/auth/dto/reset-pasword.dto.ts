import {
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class ResetPasswordDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    newPassword: string;
}