import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../../shared/dto/create-endereco.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpresaLocalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ type: CreateEnderecoDto })
  @IsNotEmpty({ each: true })
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;
}
