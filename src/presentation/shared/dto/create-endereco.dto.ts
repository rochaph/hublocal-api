import {
  IsEmpty,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { UFS } from '../../../application/enums/UfEnum';

export class CreateEnderecoDto {
  @IsEmpty()
  id: undefined;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  cep: string;

  @IsNotEmpty()
  @IsString()
  rua: string;

  @IsNotEmpty()
  @IsString()
  bairro: string;

  @IsNotEmpty()
  @IsInt()
  numero: number;

  @IsNotEmpty()
  @IsString()
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UFS))
  uf: string;
}
