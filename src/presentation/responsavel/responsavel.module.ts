import { Module } from '@nestjs/common';
import { ResponsavelController } from './responsavel.controller';

@Module({
  controllers: [ResponsavelController],
  providers: [],
})
export class ResponsavelModule {}
