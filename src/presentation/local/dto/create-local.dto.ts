import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../../shared/dto/create-endereco.dto';
import { CreateResponsavelLocalDto } from './create-responsavel-local.dto';

export class CreateLocalDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @IsNotEmpty()
  @IsInt()
  empresaId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateResponsavelLocalDto)
  responsaveis: CreateResponsavelLocalDto[];
}
