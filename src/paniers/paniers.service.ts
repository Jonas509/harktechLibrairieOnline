import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Panier } from './entities/panier.entity';
import { Repository } from 'typeorm';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class PaniersService {
  constructor(
    @InjectRepository(Panier)
    private readonly panierRepository: Repository<Panier>,
    private readonly utilisateurService: UtilisateurService, // Injectez le service UtilisateurService
  ) {}

  async create(createPanierDto: CreatePanierDto): Promise<Panier> {
    // Vérifiez si l'utilisateur existe
    const utilisateur = await this.utilisateurService.findOne(
      createPanierDto.utilisateurId,
    );

    if (!utilisateur) {
      throw new NotFoundException(
        `Utilisateur with ID ${createPanierDto.utilisateurId} not found`,
      );
    }

    const nouveauPanier = new Panier();
    nouveauPanier.date = new Date();
    nouveauPanier.utilisateur = utilisateur; // Associez l'utilisateur au panier

    // Enregistrez le nouveau panier dans la base de données
    return this.panierRepository.save(nouveauPanier);
  }
  findAll(): Promise<Panier[]> {
    return this.panierRepository.find();
  }

  async findOne(id: number): Promise<Panier> {
    const panier = await this.panierRepository.findOne({ where: { id } });

    if (!panier) {
      throw new NotFoundException(`Panier with ID ${id} not found`);
    }

    return panier;
  }

  async update(id: number, updatePanierDto: UpdatePanierDto): Promise<Panier> {
    const panier = await this.panierRepository.findOne({ where: { id } });

    if (!panier) {
      throw new NotFoundException(`Panier with ID ${id} not found`);
    }

    // Appliquez les modifications fournies dans le DTO
    if (updatePanierDto.date) {
      panier.date = updatePanierDto.date;
    }

    // Enregistrez le panier mis à jour dans la base de données
    return this.panierRepository.save(panier);
  }

  async remove(id: number): Promise<void> {
    const panier = await this.panierRepository.findOne({ where: { id } });

    if (!panier) {
      throw new NotFoundException(`Panier with ID ${id} not found`);
    }

    // Supprimez le panier de la base de données
    await this.panierRepository.remove(panier);
  }
}
