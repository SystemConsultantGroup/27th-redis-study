import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('cats')
@UseInterceptors(CacheInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats() {
    return this.catsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Post(':id')
  async createCat(@Param('id') id: string) {
    return await this.catsService.createCat(id);
  }
}
