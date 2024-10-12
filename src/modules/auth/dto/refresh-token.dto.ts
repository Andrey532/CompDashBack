import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RefreshTokensDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  refresh_token: string;
}