import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../infrastructure/auth/local.strategy';
import { GetUsuario } from '../../application/usecases/Usuario/GetUsuario';
import { UsuarioRepositoryPostgres } from '../../infrastructure/database/repository/postgres/usuario.repository.postgres';
import { UsuarioRepository } from '../../application/ports/UsuarioRepository';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../infrastructure/auth/jwt.strategy';
import { CreateUsuario } from '../../application/usecases/Usuario/CreateUsuario';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: () => ({
    secret: new ConfigService().get('JWT_SECRET'),
    signOptions: { expiresIn: '2h' },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: new ConfigService().get('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    GetUsuario,
    CreateUsuario,
    { provide: UsuarioRepository, useClass: UsuarioRepositoryPostgres },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
