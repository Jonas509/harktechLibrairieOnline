import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { Repository } from 'typeorm';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
    private readonly utilisateurService: UtilisateurService, // Injectez le service des utilisateurs
  ) {}

  async create(createCommandeDto: CreateCommandeDto): Promise<Commande> {
    // Vérifiez si l'utilisateur associé existe
    const utilisateur = await this.utilisateurService.findOne(
      createCommandeDto.utilisateurId, // Utilisez l'identifiant ou d'autres critères de recherche appropriés
    );

    if (!utilisateur) {
      throw new NotFoundException(
        `Utilisateur with ID ${createCommandeDto.utilisateurId} not found`,
      );
    }

    const commande = new Commande();
    commande.date = new Date();
    commande.montant = createCommandeDto.montant;
    commande.etat = createCommandeDto.etat;
    commande.utilisateur = utilisateur;
    commande.commandes = [];
    commande.panier = [];
    return await this.commandeRepository.save(commande);
  }

  findAll(): Promise<Commande[]> {
    return this.commandeRepository.find();
  }

  async findOne(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });

    if (!commande) {
      throw new NotFoundException(`Commande with ID ${id} not found`);
    }

    return commande;
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
  ): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });

    if (!commande) {
      throw new NotFoundException(`Commande with ID ${id} not found`);
    }

    // Appliquer les modifications à la commande en fonction du DTO de mise à jour
    if (updateCommandeDto.montant !== undefined) {
      commande.montant = updateCommandeDto.montant;
    }

    if (updateCommandeDto.etat !== undefined) {
      commande.etat = updateCommandeDto.etat;
    }
    return await this.commandeRepository.save(commande);
  }

  async remove(id: number): Promise<Commande> {
    const commande = await this.commandeRepository.findOne({ where: { id } });

    if (!commande) {
      throw new NotFoundException(`Commande with ID ${id} not found`);
    }
    return this.commandeRepository.remove(commande);
  }
}
