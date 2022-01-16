import { Module } from '@nestjs/common';
import { PrismaHealthcheckService } from './prisma.healthcheck.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [PrismaClient, PrismaHealthcheckService],
  exports: [PrismaHealthcheckService],
})
export class PrismaHealthcheckModule {}
