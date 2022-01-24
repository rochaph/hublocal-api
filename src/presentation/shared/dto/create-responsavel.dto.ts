import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from './create-endereco.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponsavelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(11, 11)
  @Matches(new RegExp('^[0-9]+$'))
  telefone: string;

  @ApiProperty({ type: CreateEnderecoDto })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
