import { IsBoolean, IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateResponsavelDto } from '../../shared/dto/create-responsavel.dto';

export class CreateResponsavelLocalDto extends CreateResponsavelDto {
  @IsNotEmpty()
  @IsBoolean()
  principalLocal: boolean;

  @IsEmpty()
  principal: undefined | null;
}
