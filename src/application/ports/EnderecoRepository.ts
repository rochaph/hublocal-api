import { BaseRepository } from './BaseRepository';
import { Injectable } from '@nestjs/common';
import Endereco from '../../domain/endereco/Endereco';

@Injectable()
export abstract class EnderecoRepository extends BaseRepository<Endereco> {}
