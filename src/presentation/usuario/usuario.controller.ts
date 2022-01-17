import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { CreateUsuario } from '../../application/usecases/Usuario/CreateUsuario';
import { Response } from 'express';
import { ApplicationException } from '../../application/exceptions/ApplicationException';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly createUsuario: CreateUsuario) {}

  @Post()
  async create(@Body() usuario: CreateUsuarioDto, @Res() res: Response) {
    try {
      await this.createUsuario.handle({
        login: usuario.login,
        senha: usuario.senha,
      });
    } catch (e) {
      e instanceof ApplicationException
        ? res.status(HttpStatus.BAD_REQUEST).json({ error: e.message })
        : res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    res.status(HttpStatus.CREATED).send();
  }
}
