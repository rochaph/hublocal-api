import { IsInt, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateEmpresaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsString()
  @Length(14, 14)
  @Matches(new RegExp('^[0-9]+$'))
  cnpj?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt()
  responsavelId?: number;
}
