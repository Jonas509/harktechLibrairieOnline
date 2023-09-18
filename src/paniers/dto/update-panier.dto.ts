import { PartialType } from '@nestjs/mapped-types';
import { CreatePanierDto } from './create-panier.dto';

export class UpdatePanierDto extends PartialType(CreatePanierDto) {}
