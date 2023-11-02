import { CacheInterceptor } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly CACHE_EVICT_METHODS = ['POST', 'PATCH', 'PUT', 'DELETE']; //해당 메서드에 대해 캐시 무효화 실행

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    if (this.CACHE_EVICT_METHODS.includes(req.method)) {
      // 캐시 무효화 처리
      console.log('cache deleting..');
      console.log(req.originalUrl.split('/'));
      return next
        .handle()
        .pipe(tap(() => this._clearCaches(req.originalUrl.split('/'))));
    }

    // 기존 캐싱 처리
    return super.intercept(context, next);
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
