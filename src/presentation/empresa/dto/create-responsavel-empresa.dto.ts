import { IsBoolean, IsNotEmpty } from 'class-validator';
import { CreateResponsavelDto } from '../../shared/dto/create-responsavel.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponsavelEmpresaDto extends CreateResponsavelDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  principal: boolean;
}
