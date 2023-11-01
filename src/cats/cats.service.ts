import { Injectable } from '@nestjs/common';
@Injectable()
export class CatsService {
  private cats = [];

  async getAll() {
    console.log('not cached');
    return this.cats;
  }
}
