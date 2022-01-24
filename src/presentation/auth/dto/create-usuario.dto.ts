import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../../infrastructure/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  senha: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Match('senha', { message: 'senha_confirmacao should match senha' })
  @MinLength(8)
  senha_confirmacao: string;
}
