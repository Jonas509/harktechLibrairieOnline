import { IsNotEmpty, IsString, IsInt, Min, IsNumber } from 'class-validator';

export class CreateLivreDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  anneePublication: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prix: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  qte: number;

  @IsNotEmpty()
  @IsString()
  auteur: string;

  @IsNotEmpty()
  @IsString()
  categorie: string;
}
