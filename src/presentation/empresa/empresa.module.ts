import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaRepository } from '../../application/ports/EmpresaRepository';
import { EmpresaRepositoryPostgres } from '../../infrastructure/database/repository/postgres/empresa.repository.postgres';
import { CreateEmpresa } from '../../application/usecases/Empresa/CreateEmpresa';
import { UpdateEmpresa } from '../../application/usecases/Empresa/UpdateEmpresa';
import { GetEmpresa } from '../../application/usecases/Empresa/GetEmpresa';
import { DeleteEmpresa } from '../../application/usecases/Empresa/DeleteEmpresa';
import { GetResponsavel } from '../../application/usecases/Responsavel/GetResponsavel';

@Module({
  controllers: [EmpresaController],
  providers: [
    CreateEmpresa,
    UpdateEmpresa,
    GetEmpresa,
    DeleteEmpresa,
    GetResponsavel,
    { provide: EmpresaRepository, useClass: EmpresaRepositoryPostgres },
  ],
})
export class EmpresaModule {}
