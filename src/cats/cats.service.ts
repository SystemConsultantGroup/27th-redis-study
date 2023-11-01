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
    await this.cacheManager.del('/cats');
    // await this._clearCaches(['/cats']);
    return cat;
  }

  private async _clearCaches(cacheKeys: string[]): Promise<boolean> {
    const result = cacheKeys.map(async (cacheKey) => {
      const _keys = await this.cacheManager.store.keys(`*${cacheKey}*`);
      const keys = _keys.flat();
      return Promise.all(keys.map((key) => !!this.cacheManager.del(key)));
    });
    return result.flat().every((r) => !!r);
  }
}
