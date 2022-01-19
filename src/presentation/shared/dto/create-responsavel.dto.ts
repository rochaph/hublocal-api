import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from './create-endereco.dto';

export class CreateResponsavelDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsInt()
  telefone: bigint;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
