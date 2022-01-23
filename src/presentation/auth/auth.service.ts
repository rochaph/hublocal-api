import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUsuario } from '../../application/usecases/Usuario/GetUsuario';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import Usuario from '../../domain/usuario/Usuario';

@Injectable()
export class AuthService {
  constructor(
    readonly getUsuario: GetUsuario,
    readonly jwtService: JwtService,
  ) {}

  async validateUsuario(login: string, password: string): Promise<Usuario> {
    const usuario = await this.getUsuario.getByLoginWithPassword(login);

    if (!usuario || !(await compare(password, usuario.senha))) {
      throw new UnauthorizedException();
    }
    const { senha, empresas, ...result } = usuario;

    return result;
  }

  async login({
    usuario: { id, login },
  }: {
    usuario: { id: number; login: string };
  }) {
    const payload = this.jwtService.sign({ usuario: { id, login } });
    return {
      access_token: payload,
    };
  }
}
