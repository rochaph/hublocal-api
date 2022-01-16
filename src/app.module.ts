import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { CacheService } from './infrastructure/cache/cache.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { PrismaHealthcheckModule } from './infrastructure/database/prisma/healthcheck/prisma.healthcheck.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TerminusModule,
    CacheModule.registerAsync({ useClass: CacheService }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '../.env',
    }),
    PrismaHealthcheckModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
