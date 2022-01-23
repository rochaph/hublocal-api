import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { PrismaHealthcheckModule } from '../../infrastructure/database/orm/prisma/healthcheck/prisma.healthcheck.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, ConfigModule, PrismaHealthcheckModule],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('app.controller', () => {
    it('should return an Object', () => {
      expect(appController.healthCheck()).toBeInstanceOf(Object);
    });
  });
});
