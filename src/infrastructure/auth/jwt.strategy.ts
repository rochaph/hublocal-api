import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetUsuario } from '../../application/usecases/Usuario/GetUsuario';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    readonly getUsuario: GetUsuario,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(req: { usuario: { id: number } }) {
    const usuario = await this.getUsuario.getById(req.usuario.id);
    if (!usuario) throw new UnauthorizedException();
    return { id: usuario.id, login: usuario.login };
  }
}
