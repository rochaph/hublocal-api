import { IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../../infrastructure/decorators/match.decorator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  @Match('senha', { message: 'senha_confirmacao should match senha' })
  senha_confirmacao: string;
}
