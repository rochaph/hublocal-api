import { BaseRepository } from './BaseRepository';
import { Injectable } from '@nestjs/common';
import Responsavel from '../../domain/responsavel/Responsavel';

@Injectable()
export abstract class ResponsavelRepository extends BaseRepository<Responsavel> {}
