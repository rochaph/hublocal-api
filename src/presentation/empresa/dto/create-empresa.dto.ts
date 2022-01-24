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
import { ApiProperty } from '@nestjs/swagger';
import { CreateResponsavelDto } from '../../shared/dto/create-responsavel.dto';

export class CreateEmpresaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(14, 14)
  @Matches(new RegExp('^[0-9]+$'))
  cnpj: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ApiProperty({ type: [CreateResponsavelDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateResponsavelEmpresaDto)
  responsaveis: CreateResponsavelEmpresaDto[];

  @ApiProperty({ type: [CreateEmpresaLocalDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateEmpresaLocalDto)
  locais: CreateEmpresaLocalDto[];
}
