import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './presentation/app/app.controller';
import { CacheService } from './infrastructure/cache/cache.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { PrismaHealthcheckModule } from './infrastructure/database/orm/prisma/healthcheck/prisma.healthcheck.module';
import { HttpModule } from '@nestjs/axios';
import { EmpresaModule } from './presentation/empresa/empresa.module';
import { LocalModule } from './presentation/local/local.module';
import { AuthModule } from './presentation/auth/auth.module';
import { JwtAuthGuard } from './infrastructure/auth/jwt-auth.guard';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
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
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
