import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RefreshTokensDto {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJ1c2VyTmFtZSI6ImV4YW1wbGU5OUBtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzI4ODM0NDAzLCJleHAiOjE3Mjg5MjA4MDN9.dRihUQwcxpUxbPI1gMQLZL5whkhsFc5ov8u5kmDga0k",
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  access_token: string;

  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJ1c2VyTmFtZSI6ImV4YW1wbGU5OUBtYWlsLmNvbSIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzI4ODM0NDAzLCJleHAiOjE3Mjg5MjA4MDN9.dRihUQwcxpUxbPI1gMQLZL5whkhsFc5ov8u5kmDga07",
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  refresh_token: string;
}