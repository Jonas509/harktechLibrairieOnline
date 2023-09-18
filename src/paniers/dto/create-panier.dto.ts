import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
export class CreatePanierDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  utilisateurId: number; // L'ID de l'utilisateur auquel le panier est associé
}
