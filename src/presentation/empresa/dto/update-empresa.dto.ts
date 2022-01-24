import { IsInt, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmpresaDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsString()
  @Length(14, 14)
  @Matches(new RegExp('^[0-9]+$'))
  cnpj?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  responsavelId?: number;
}
