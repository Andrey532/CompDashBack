import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TokenDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    access_token: string;
}