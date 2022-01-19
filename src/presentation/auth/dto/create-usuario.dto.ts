import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../../infrastructure/decorators/match.decorator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  senha: string;

  @IsString()
  @IsNotEmpty()
  @Match('senha', { message: 'senha_confirmacao should match senha' })
  @MinLength(8)
  senha_confirmacao: string;
}
