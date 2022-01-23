import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './presentation/app/app.controller';
import { CacheService } from './infrastructure/cache/cache.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { PrismaHealthcheckModule } from './infrastructure/database/orm/prisma/healthcheck/prisma.healthcheck.module';
import { HttpModule } from '@nestjs/axios';
import { EmpresaModule } from './presentation/empresa/empresa.module';
import { LocalModule } from './presentation/local/local.module';
import { AuthModule } from './presentation/auth/auth.module';

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
    EmpresaModule,
    LocalModule,
    AuthModule,
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
