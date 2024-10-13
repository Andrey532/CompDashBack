import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Company } from './entity/company.entity';
import { Auth } from '../auth/entities/auth.entity';
import { TokenService } from '../auth/services/token.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly tokenService: TokenService,
  ) { }

  async createCompany(
    id: number,
    createCompany: CreateCompanyDTO,
    token: string,
  ): Promise<Company> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const user = await this.authRepository.findOneBy({
      id,
      owner: decodedToken.sub,
    });
    if (!user) throw new NotFoundException('Company not found');

    const company = new Company({ ...createCompany, auth: user });

    this.companyRepository.save(company);

    return plainToInstance(Company, company);
  }

  async getCompanies(
    token: string,
    sortBy: string,
    order: 'ASC' | 'DESC',
    option: IPaginationOptions,
  ): Promise<Pagination<Company> > {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const user = await this.authRepository.find({
      where: { id: +decodedToken.sub },
      relations: ['companies'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let query = this.companyRepository
      .createQueryBuilder('company')
      .leftJoin('company.auth', 'auth')
      .where('auth.id IN (:...authIds)', { authIds: user.map((u) => u.id) });

    if (sortBy === 'name' || sortBy === 'service_of_activity') {
      query = query.orderBy(`company.${sortBy}`, order);
    } else {
      throw new BadRequestException(`Cannot sort by ${sortBy}`);
    }

    const companies = await query.getMany();

    return paginate<Company>(this.companyRepository, option, )
  }

  async getCompany(id: number, token: string): Promise<Company> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const user = await this.authRepository.findOne({
      where: { id: +decodedToken.sub },
      relations: ['companies'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['auth'],
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }
    if (company.auth.id !== user.id) {
      throw new NotFoundException('User not authorized to access this company');
    }

    return plainToClass(Company, company);
  }

  async updateCompany(
    id: number,
    updateCompany: UpdateCompanyDTO,
    token: string,
  ): Promise<UpdateCompanyDTO> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const user = await this.authRepository.findOne({
      where: { id: +decodedToken.sub },
      relations: ['companies'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['auth'],
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (company.auth.id !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to update this company',
      );
    }

    await this.companyRepository.update({ id }, { ...updateCompany });

    return updateCompany;
  }

  async deleteCompany(id: number, token: string): Promise<void> {
    const decodedToken: { sub: string } =
      await this.tokenService.decoder(token);

    const user = await this.authRepository.findOne({
      where: { id: +decodedToken.sub },
      relations: ['companies'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['auth'],
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (company.auth.id !== user.id) {
      throw new UnauthorizedException(
        'You do not have permission to delete this company',
      );
    }

    await this.companyRepository.remove(company);
  }
}