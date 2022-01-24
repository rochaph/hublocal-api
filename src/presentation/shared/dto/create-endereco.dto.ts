import { IsIn, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { UFS } from '../../../application/enums/UfEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rua: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bairro: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  numero: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty({
    enum: UFS,
    enumName: 'UFS',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UFS))
  uf: string;
}
