import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../../shared/dto/create-endereco.dto';

export class UpdateLocalDto {
  @IsOptional()
  @IsString()
  nome: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @IsOptional()
  @IsInt()
  responsavelId: number;
}
