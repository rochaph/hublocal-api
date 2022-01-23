import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from 'src/application/ports/UsuarioRepository';
import { CreateUsuario } from 'src/application/usecases/Usuario/CreateUsuario';
import { GetUsuario } from 'src/application/usecases/Usuario/GetUsuario';
import { JwtStrategy } from 'src/infrastructure/auth/jwt.strategy';
import { LocalStrategy } from 'src/infrastructure/auth/local.strategy';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: 'teste',
            signOptions: { expiresIn: '2h' },
          }),
        }),
        PassportModule,
      ],
      providers: [
        LocalStrategy,
        JwtStrategy,
        AuthService,
        GetUsuario,
        CreateUsuario,
        { provide: UsuarioRepository, useFactory: () => ({}) },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: () => 'teste',
          }),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
