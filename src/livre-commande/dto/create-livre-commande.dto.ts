import { IsInt, IsPositive, Min } from 'class-validator';

export class CreateLivreCommandeDto {
  @IsInt()
  @Min(1)
  qte: number;

  @IsInt()
  @IsPositive()
  livreId: number;

  @IsInt()
  @IsPositive()
  commandeId: number;
}
