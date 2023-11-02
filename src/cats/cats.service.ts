import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CatsService {
  private cats = [];
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  getAll() {
    console.log('not cached');
    return this.cats;
  }

  findOne(id: number) {
    if (id < this.cats.length) {
      return this.cats[id];
    } else {
      return 'index error';
    }
  }

  async createCat(cat: string) {
    this.cats.push(cat);
    return cat;
  }
}
