import { BaseRepository } from './BaseRepository';
import { Injectable } from '@nestjs/common';
import Empresa from '../../domain/empresa/Empresa';

@Injectable()
export abstract class EmpresaRepository extends BaseRepository<Empresa> {}
