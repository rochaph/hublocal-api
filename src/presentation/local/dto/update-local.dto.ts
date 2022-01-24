import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../../shared/dto/create-endereco.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocalDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome: string;

  @ApiProperty({ type: CreateEnderecoDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  responsavelId: number;
}
