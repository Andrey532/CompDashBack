import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logout } from '../entities/logout.entity';

@Injectable()
export class LogoutService {
  constructor(
    @InjectRepository(Logout)
    private readonly blackListedTokenRepository: Repository<Logout>,
  ) {}

  async blackListToken(token: string): Promise<Logout> {
    const addToBlackList = new Logout({ token });

    return await this.blackListedTokenRepository.save(addToBlackList);
  }

  async isTokenBlackListed(token: string): Promise<boolean> {
    const tokenExist = await this.blackListedTokenRepository.findOne({
      where: { token },
    });
    return !!tokenExist;
  }
}