import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateLocal } from '../../application/usecases/Local/CreateLocal';
import { GetLocal } from '../../application/usecases/Local/GetLocal';
import { UpdateLocal } from '../../application/usecases/Local/UpdateLocal';
import { DeleteLocal } from '../../application/usecases/Local/DeleteLocal';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { ApplicationExceptionFilter } from '../../infrastructure/filters/ApplicationExceptionFilter';
import { Response } from 'express';

@UseFilters(ApplicationExceptionFilter)
@Controller('local')
export class LocalController {
  constructor(
    readonly createLocal: CreateLocal,
    readonly getLocal: GetLocal,
    readonly updateLocal: UpdateLocal,
    readonly deleteLocal: DeleteLocal,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() local: CreateLocalDto) {
    await this.createLocal.execute(local);
    res.status(HttpStatus.CREATED).end();
  }

  @Get()
  findAll() {
    return this.getLocal.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getLocal.execute(+id);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() local: UpdateLocalDto,
  ) {
    await this.updateLocal.execute(+id, local);
    res.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    await this.deleteLocal.execute(+id);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
