import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from 'src/application/ports/UsuarioRepository';
import { CreateUsuario } from 'src/application/usecases/Usuario/CreateUsuario';
import { GetUsuario } from 'src/application/usecases/Usuario/GetUsuario';
import { JwtStrategy } from 'src/infrastructure/auth/jwt.strategy';
import { LocalStrategy } from 'src/infrastructure/auth/local.strategy';
import { AuthService } from 'src/presentation/auth/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: new ConfigService().get('JWT_SECRET'),
            signOptions: { expiresIn: '2h' },
          }),
        }),
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
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
