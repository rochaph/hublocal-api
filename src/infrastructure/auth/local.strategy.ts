import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../presentation/auth/auth.service';
import Usuario from '../../domain/usuario/Usuario';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(readonly authService: AuthService) {
    super({ usernameField: 'login', passwordField: 'senha' });
  }

  async validate(login: string, senha: string): Promise<Usuario> {
    return await this.authService.validateUsuario(login, senha);
  }
}
