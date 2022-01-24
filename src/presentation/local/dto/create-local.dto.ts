import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../../shared/dto/create-endereco.dto';
import { CreateResponsavelLocalDto } from './create-responsavel-local.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ type: CreateEnderecoDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  empresaId: number;

  @ApiProperty({ type: [CreateResponsavelLocalDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateResponsavelLocalDto)
  responsaveis: CreateResponsavelLocalDto[];
}
