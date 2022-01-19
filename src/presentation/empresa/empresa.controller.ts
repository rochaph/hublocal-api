import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { CreateEmpresa } from '../../application/usecases/Empresa/CreateEmpresa';
import { GetEmpresa } from '../../application/usecases/Empresa/GetEmpresa';
import { UpdateEmpresa } from '../../application/usecases/Empresa/UpdateEmpresa';
import { DeleteEmpresa } from '../../application/usecases/Empresa/DeleteEmpresa';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApplicationExceptionFilter } from '../../infrastructure/filters/ApplicationExceptionFilter';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('empresa')
@UseFilters(ApplicationExceptionFilter)
export class EmpresaController {
  constructor(
    readonly jwtService: JwtService,
    readonly createEmpresa: CreateEmpresa,
    readonly getEmpresa: GetEmpresa,
    readonly updateEmpresa: UpdateEmpresa,
    readonly deleteEmpresa: DeleteEmpresa,
  ) {}

  @Post()
  async create(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: CreateEmpresaDto,
  ) {
    const { sub } = this.jwtService.decode(
      req.header('authorization').substring(7),
    );
    await this.createEmpresa.execute({ ...data, usuarioId: sub });
    res.status(HttpStatus.CREATED).end();
  }

  @Get()
  findAll() {
    return this.getEmpresa.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getEmpresa.execute(+id);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() empresa: UpdateEmpresaDto,
  ) {
    await this.updateEmpresa.execute(+id, empresa);
    res.status(HttpStatus.NO_CONTENT).end();
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.deleteEmpresa.execute(+id);
    res.status(HttpStatus.NO_CONTENT).end();
  }
}
