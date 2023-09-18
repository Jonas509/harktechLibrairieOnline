/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail({}, { message: "L'email n'est pas valide" })
  @ApiProperty({
    description: "email de l'utilisateur",
  })
  email: string;
  @IsNotEmpty({ message: 'Veuillez entrer un mot de passe' })
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 8 caractéres' })
  @ApiProperty({
    description: "mot de passe de l'utilisateur",
  })
  password: string;
}
