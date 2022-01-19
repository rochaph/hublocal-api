import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUsuario } from '../../application/usecases/Usuario/GetUsuario';
import { JwtService } from '@nestjs/jwt';
import Usuario from '../../domain/usuario/Usuario';
import { compare } from 'bcrypt';
import { HashFactory } from '../../application/factories/HashFactory';

@Injectable()
export class AuthService {
  constructor(
    readonly getUsuario: GetUsuario,
    readonly jwtService: JwtService,
  ) {}

  async validateUsuario(login: string, senha: string): Promise<Usuario> {
    const usuario = await this.getUsuario.getByLoginWithPassword(login);

    const hash = await new HashFactory().create(senha);
    if (!usuario || (await compare(hash, usuario.senha))) {
      throw new UnauthorizedException();
    }
    const { senha: usuarioSenha, ...result } = usuario;
    return result;
  }

  async login(usuario: { id: number }) {
    const payload = this.jwtService.sign({ sub: usuario.id });
    return {
      access_token: payload,
    };
  }
}
