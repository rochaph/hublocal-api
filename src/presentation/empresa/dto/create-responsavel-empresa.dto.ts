import { IsBoolean, IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateResponsavelDto } from '../../shared/dto/create-responsavel.dto';

export class CreateResponsavelEmpresaDto extends CreateResponsavelDto {
  @IsNotEmpty()
  @IsBoolean()
  principal: boolean;

  @IsEmpty()
  principalLocal: undefined | null;
}
