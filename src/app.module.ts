import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [
    CatsModule,
    CacheModule.register({
      isGlobal: true, //기본 ttl 5초, 캐시는 최대 100개
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
