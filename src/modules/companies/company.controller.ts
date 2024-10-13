import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { Company } from './entity/company.entity';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Company")
@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post(':id')
  createCompany(
    @Body() createCompany: CreateCompanyDTO,
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ): Promise<Company> {
    return this.companyService.createCompany(id, createCompany, token);
  }

  @Get()
  getCompanies(
    @Headers('Authorization') token: string,
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Company>> {
    limit = limit > 100 ? 100 : limit
    return this.companyService.getCompanies(token, sortBy, order, {page, limit});
  }

  @Get(':id')
  getCompany(
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ): Promise<Company> {
    return this.companyService.getCompany(id, token);
  }

  @Put(':id')
  async updateCompany(
    @Body() updateCompany: UpdateCompanyDTO,
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ): Promise<UpdateCompanyDTO> {
    try {
      return await this.companyService.updateCompany(id, updateCompany, token);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Company not found');
      }
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(
          'You do not have permission to update this company',
        );
      }
      throw new Error('An error occurred while updating the company');
    }
  }

  @Delete(':id')
  async deleteCompany(
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ): Promise<void> {
    try {
      await this.companyService.deleteCompany(id, token);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Company not found');
      }
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(
          'You do not have permission to delete this company',
        );
      }
      throw new Error('An error occurred while deleting the company');
    }
  }
}