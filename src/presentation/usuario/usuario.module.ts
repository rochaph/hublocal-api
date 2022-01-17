import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { CreateUsuario } from '../../application/usecases/Usuario/CreateUsuario';
import { UsuarioRepositoryPostgres } from '../../infrastructure/database/repository/postgres/usuario.repository.postgres';
import { UsuarioRepository } from '../../application/ports/UsuarioRepository';

@Module({
  controllers: [UsuarioController],
  providers: [
    CreateUsuario,
    { provide: UsuarioRepository, useClass: UsuarioRepositoryPostgres },
  ],
})
export class UsuarioModule {}
