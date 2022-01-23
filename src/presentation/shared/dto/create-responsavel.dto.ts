import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from './create-endereco.dto';

export class CreateResponsavelDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @Length(11, 11)
  @Matches(new RegExp('^[0-9]+$'))
  telefone: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
