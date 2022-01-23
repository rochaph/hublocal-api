import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaRepository } from 'src/application/ports/EmpresaRepository';
import { LocalRepository } from 'src/application/ports/LocalRepository';
import { CreateLocal } from 'src/application/usecases/Local/CreateLocal';
import { DeleteLocal } from 'src/application/usecases/Local/DeleteLocal';
import { GetLocal } from 'src/application/usecases/Local/GetLocal';
import { UpdateLocal } from 'src/application/usecases/Local/UpdateLocal';
import { EmpresaRepositoryPostgres } from 'src/infrastructure/database/repository/postgres/empresa.repository.postgres';
import { LocalRepositoryPostgres } from 'src/infrastructure/database/repository/postgres/local.repository.postgres';
import { LocalController } from './local.controller';

describe('LocalController', () => {
  let controller: LocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalController],
      providers: [
        UpdateLocal,
        CreateLocal,
        GetLocal,
        DeleteLocal,
        UpdateLocal,
        { provide: LocalRepository, useClass: LocalRepositoryPostgres },
        { provide: EmpresaRepository, useClass: EmpresaRepositoryPostgres },
      ],
    }).compile();

    controller = module.get<LocalController>(LocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
