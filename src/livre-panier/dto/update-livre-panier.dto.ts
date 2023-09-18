import { PartialType } from '@nestjs/mapped-types';
import { CreateLivrePanierDto } from './create-livre-panier.dto';

export class UpdateLivrePanierDto extends PartialType(CreateLivrePanierDto) {}
