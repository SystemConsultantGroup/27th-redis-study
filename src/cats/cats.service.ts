import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CatsService {
  private cats = [];

  constructor(@Inject() private cacheManger: Cache) {}

  async getAll() {
    console.log('not cached');
    return await this.cats;
  }
}
