import { Module } from '@nestjs/common';
import { PrismaHealthcheckService } from './prisma.healthcheck.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, PrismaHealthcheckService],
  exports: [PrismaHealthcheckService],
})
export class PrismaHealthcheckModule {}
