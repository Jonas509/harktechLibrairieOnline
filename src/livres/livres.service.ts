import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { Livre } from './entities/livre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LivresService {
  constructor(
    @InjectRepository(Livre)
    private readonly livreRepository: Repository<Livre>,
  ) {}

  async findAll(): Promise<Livre[]> {
    return await this.livreRepository.find();
  }
  async findOne(id: number): Promise<Livre | null> {
    const livre = await this.livreRepository.findOne({ where: { id } });

    if (!livre) {
      throw new NotFoundException(`Livre with ID ${id} not found`);
    }

    return livre;
  }

  create(createLivreDto: CreateLivreDto): Promise<Livre> {
    const nouveauLivre = new Livre();
    nouveauLivre.titre = createLivreDto.titre;
    nouveauLivre.description = createLivreDto.description;
    nouveauLivre.anneePublucation = createLivreDto.anneePublication;
    nouveauLivre.prix = createLivreDto.prix;
    nouveauLivre.qte = createLivreDto.qte;
    nouveauLivre.auteur = createLivreDto.auteur;
    nouveauLivre.categorie = createLivreDto.categorie;
    return this.livreRepository.save(nouveauLivre);
  }

  async update(id: number, updateLivreDto: UpdateLivreDto): Promise<Livre> {
    const livre = await this.livreRepository.findOne({ where: { id } });

    if (!livre) {
      throw new NotFoundException(`Livre with ID ${id} not found`);
    }

    // Appliquez les mises à jour au livre existant
    if (updateLivreDto.titre !== undefined) {
      livre.titre = updateLivreDto.titre;
    }
    if (updateLivreDto.description !== undefined) {
      livre.description = updateLivreDto.description;
    }
    if (updateLivreDto.anneePublication !== undefined) {
      livre.anneePublucation = updateLivreDto.anneePublication;
    }
    if (updateLivreDto.prix !== undefined) {
      livre.prix = updateLivreDto.prix;
    }
    if (updateLivreDto.qte !== undefined) {
      livre.qte = updateLivreDto.qte;
    }
    if (updateLivreDto.auteur !== undefined) {
      livre.auteur = updateLivreDto.auteur;
    }
    if (updateLivreDto.categorie !== undefined) {
      livre.categorie = updateLivreDto.categorie;
    }

    // Enregistrez les modifications dans la base de données
    await this.livreRepository.save(livre);

    // Renvoyez le livre mis à jour
    return livre;
  }

  async remove(id: number): Promise<Livre> {
    // Récupérez le livre existant par son ID
    const livre = await this.livreRepository.findOne({ where: { id } });

    if (!livre) {
      throw new NotFoundException(`Livre with ID ${id} not found`);
    }

    // Supprimez le livre de la base de données
    await this.livreRepository.remove(livre);

    // Renvoyez le livre supprimé
    return livre;
  }
}
