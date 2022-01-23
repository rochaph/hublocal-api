import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateLocal } from '../../application/usecases/Local/CreateLocal';
import { GetLocal } from '../../application/usecases/Local/GetLocal';
import { UpdateLocal } from '../../application/usecases/Local/UpdateLocal';
import { DeleteLocal } from '../../application/usecases/Local/DeleteLocal';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { ApplicationExceptionFilter } from '../../infrastructure/filters/application-exception.filter';
import { Response } from 'express';
import { QueryPagination, RequestWithUser } from '../shared/types';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';

@UseFilters(ApplicationExceptionFilter)
@Controller('local')
@UseGuards(JwtAuthGuard)
export class LocalController {
  constructor(
    readonly createLocal: CreateLocal,
    readonly getLocal: GetLocal,
    readonly updateLocal: UpdateLocal,
    readonly deleteLocal: DeleteLocal,
  ) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @Body() local: CreateLocalDto,
  ) {
    await this.createLocal.execute(req.user.id, local);
    res.status(HttpStatus.CREATED).end();
  }

  @Get()
  findAll(@Req() req: RequestWithUser, @Query() query: QueryPagination) {
    return this.getLocal.execute({
      usuarioId: req.user.id,
      page: +query.page,
      limit: +query.limit,
    });
  }

  @Get(':id')
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.getLocal.execute({
      usuarioId: req.user.id,
      id: +id,
    });
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() local: UpdateLocalDto,
  ) {
    await this.updateLocal.execute(req.user.id, +id, local);
    res.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete(':id')
  async remove(
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.deleteLocal.execute(req.user.id, +id);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
