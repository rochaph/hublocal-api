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
import { AllowUnauthorizedRequest } from '../../infrastructure/auth/allow-unauthorized';
import { LocalAuthGuard } from '../../infrastructure/auth/local-auth.guard';
import { GetUsuario } from '../../application/usecases/Usuario/GetUsuario';
import { ApplicationExceptionFilter } from '../../infrastructure/filters/ApplicationExceptionFilter';

@Controller('auth')
@UseFilters(new ApplicationExceptionFilter())
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly getUsuario: GetUsuario,
    readonly createUsuario: CreateUsuario,
  ) {}

  @Post('/login')
  @AllowUnauthorizedRequest()
  @UseGuards(LocalAuthGuard)
  async login(@Request() { user: { id } }: { user: { id: number } }) {
    return this.authService.login({ id });
  }

  @Post('/register')
  @AllowUnauthorizedRequest()
  async create(@Body() usuario: CreateUsuarioDto, @Res() res: Response) {
    await this.createUsuario.execute({
      login: usuario.login,
      senha: usuario.senha,
    });
    const registeredUsuario = await this.getUsuario.getByLogin(usuario.login);
    if (!registeredUsuario.id) throw new UnauthorizedException();
    const token = await this.login({ user: { id: registeredUsuario.id } });
    res.status(HttpStatus.CREATED).json(token);
  }
}
