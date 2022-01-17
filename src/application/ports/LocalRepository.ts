import { BaseRepository } from './BaseRepository';
import { Injectable } from '@nestjs/common';
import Local from '../../domain/local/Local';

@Injectable()
export abstract class LocalRepository extends BaseRepository<Local> {}
