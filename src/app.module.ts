import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisCacheStore from 'cache-manager-ioredis';
@Module({
  imports: [
    CatsModule,
    CacheModule.register({
      isGlobal: true,
      store: redisCacheStore,
      host: 'localhost',
      port: '6379',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
