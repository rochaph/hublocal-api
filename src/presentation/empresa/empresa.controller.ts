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
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { CreateEmpresa } from '../../application/usecases/Empresa/CreateEmpresa';
import { GetEmpresa } from '../../application/usecases/Empresa/GetEmpresa';
import { UpdateEmpresa } from '../../application/usecases/Empresa/UpdateEmpresa';
import { DeleteEmpresa } from '../../application/usecases/Empresa/DeleteEmpresa';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApplicationExceptionFilter } from '../../infrastructure/filters/application-exception.filter';
import { Response } from 'express';
import { QueryPagination, RequestWithUser } from '../shared/types';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { GetResponsavel } from '../../application/usecases/Responsavel/GetResponsavel';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('empresa')
@UseFilters(ApplicationExceptionFilter)
@UseGuards(JwtAuthGuard)
export class EmpresaController {
  constructor(
    readonly createEmpresa: CreateEmpresa,
    readonly getEmpresa: GetEmpresa,
    readonly updateEmpresa: UpdateEmpresa,
    readonly deleteEmpresa: DeleteEmpresa,
    readonly getResponsavel: GetResponsavel,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ status: 404, description: 'Bad Request.' })
  async create(
    @Res() res: Response,
    @Req() req: RequestWithUser,
    @Body() data: CreateEmpresaDto,
  ) {
    await this.createEmpresa.execute({
      ...data,
      usuarioId: req.user.id,
    });
    res.status(HttpStatus.CREATED).end();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiForbiddenResponse({ status: 404, description: 'Bad Request.' })
  findAll(@Req() req: RequestWithUser, @Query() query: QueryPagination) {
    const page = query.page ? parseInt(query.page) : undefined;
    const limit = query.limit ? parseInt(query.limit) : undefined;

    return this.getEmpresa.execute({
      usuarioId: req.user.id,
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.getEmpresa.execute({ usuarioId: req.user.id, id: +id });
  }

  @Get('/responsaveis/:id')
  findAllResponsaveis(
    @Req() req: RequestWithUser,
    @Param('id') idEmpresa: string,
  ) {
    return this.getResponsavel.execute(+req.user.id, +idEmpresa);
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() empresa: UpdateEmpresaDto,
  ) {
    await this.updateEmpresa.execute(req.user.id, +id, empresa);
    res.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete(':id')
  async remove(
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.deleteEmpresa.execute(req.user.id, +id);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
