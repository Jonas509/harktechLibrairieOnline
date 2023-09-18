import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLivrePanierDto {
  @IsNotEmpty()
  @IsNumber()
  livreId: number; // L'ID du livre associé au panier

  @IsNotEmpty()
  @IsNumber()
  utilisateurId: number; // L'ID de l'utilisateur associé au panier

  @IsNotEmpty()
  @IsNumber()
  panierId: number; // L'ID du panier auquel le livre est ajouté

  @IsNotEmpty()
  @IsNumber()
  quantite: number; // La quantité du livre dans le panier
}
