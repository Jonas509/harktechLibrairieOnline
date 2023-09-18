import { PartialType } from '@nestjs/mapped-types';
import { CreateLivreCommandeDto } from './create-livre-commande.dto';

export class UpdateLivreCommandeDto extends PartialType(CreateLivreCommandeDto) {}
