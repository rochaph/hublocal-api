import { Module } from '@nestjs/common';
import { LocalController } from './local.controller';
import { UpdateLocal } from '../../application/usecases/Local/UpdateLocal';
import { CreateLocal } from '../../application/usecases/Local/CreateLocal';
import { GetLocal } from '../../application/usecases/Local/GetLocal';
import { DeleteLocal } from '../../application/usecases/Local/DeleteLocal';
import { LocalRepository } from '../../application/ports/LocalRepository';
import { LocalRepositoryPostgres } from '../../infrastructure/database/repository/postgres/local.repository.postgres';
import { EmpresaRepository } from '../../application/ports/EmpresaRepository';
import { EmpresaRepositoryPostgres } from '../../infrastructure/database/repository/postgres/empresa.repository.postgres';

@Module({
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
})
export class LocalModule {}
