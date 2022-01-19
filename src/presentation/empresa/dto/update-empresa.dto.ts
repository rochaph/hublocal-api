import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateEmpresaDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsInt()
  cnpj?: bigint;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt()
  responsavelId?: number;
}
