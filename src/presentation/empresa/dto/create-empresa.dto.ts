import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEmpresaLocalDto } from './create-empresa-local.dto';
import { CreateResponsavelEmpresaDto } from './create-responsavel-empresa.dto';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  @Matches(new RegExp('^[0-9]+$'))
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateResponsavelEmpresaDto)
  responsaveis: CreateResponsavelEmpresaDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateEmpresaLocalDto)
  locais: CreateEmpresaLocalDto[];
}
