import { PartialType } from '@nestjs/mapped-types';
import { CreateLivreDto } from './create-livre.dto';

export class UpdateLivreDto extends PartialType(CreateLivreDto) {}
