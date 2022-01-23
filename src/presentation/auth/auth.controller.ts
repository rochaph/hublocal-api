import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuario } from '../../application/usecases/Usuario/CreateUsuario';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Response } from 'express';
import { LocalAuthGuard } from '../../infrastructure/auth/local-auth.guard';
import { GetUsuario } from '../../application/usecases/Usuario/GetUsuario';
import { ApplicationExceptionFilter } from '../../infrastructure/filters/application-exception.filter';
import { RequestWithUser } from '../shared/types';

@Controller('auth')
@UseFilters(new ApplicationExceptionFilter())
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly getUsuario: GetUsuario,
    readonly createUsuario: CreateUsuario,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: RequestWithUser, @Res() res: Response) {
    const token = await this.authService.login({ usuario: req.user });
    res.status(HttpStatus.OK).json(token);
  }

  @Post('/register')
  async create(@Res() res: Response, @Body() usuario: CreateUsuarioDto) {
    await this.createUsuario.execute({
      login: usuario.login,
      senha: usuario.senha,
    });
    const registeredUsuario = await this.getUsuario.getByLogin(usuario.login);
    if (!registeredUsuario.id) throw new UnauthorizedException();
    const token = await this.authService.login({
      usuario: {
        id: registeredUsuario.id,
        login: registeredUsuario.login,
      },
    });
    res.status(HttpStatus.CREATED).json(token);
  }
}
