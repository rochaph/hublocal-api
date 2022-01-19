import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../../shared/dto/create-endereco.dto';

export class CreateEmpresaLocalDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty({ each: true })
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
