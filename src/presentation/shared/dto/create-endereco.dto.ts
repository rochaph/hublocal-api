import {
  IsEmpty,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { UFS } from '../../../application/enums/UfEnum';

export class CreateEnderecoDto {
  @IsEmpty()
  id: undefined | null;

  @IsInt()
  @ValidateIf((object, value) => {
    if (typeof value !== 'number') return false;
  })
  cep: number;

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
