import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUtilisateurDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsString()
  prenom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6) // Exemple de validation de longueur minimale du mot de passe
  password: string;

  @IsString()
  photo: string;
}
