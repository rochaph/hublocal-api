import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaRepository } from 'src/application/ports/EmpresaRepository';
import { CreateEmpresa } from 'src/application/usecases/Empresa/CreateEmpresa';
import { DeleteEmpresa } from 'src/application/usecases/Empresa/DeleteEmpresa';
import { GetEmpresa } from 'src/application/usecases/Empresa/GetEmpresa';
import { UpdateEmpresa } from 'src/application/usecases/Empresa/UpdateEmpresa';
import { GetResponsavel } from 'src/application/usecases/Responsavel/GetResponsavel';
import { EmpresaController } from './empresa.controller';

describe('EmpresaController', () => {
  let controller: EmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        CreateEmpresa,
        UpdateEmpresa,
        GetEmpresa,
        DeleteEmpresa,
        GetResponsavel,
        { provide: EmpresaRepository, useFactory: () => ({}) },
      ],
    }).compile();

    controller = module.get<EmpresaController>(EmpresaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
