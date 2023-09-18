import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateCommandeDto {
  @IsDateString()
  date: Date;

  @IsNumber()
  montant: number;

  @IsString()
  etat: string;

  @IsNumber()
  utilisateurId: number;
}
