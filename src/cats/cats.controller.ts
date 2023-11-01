import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('cats')
@UseInterceptors(CacheInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats() {
    return await this.catsService.getAll();
  }
}
