import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLivrePanierDto } from './dto/create-livre-panier.dto';
import { UpdateLivrePanierDto } from './dto/update-livre-panier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LivrePanier } from './entities/livre-panier.entity';
import { Repository } from 'typeorm';
import { LivresService } from 'src/livres/livres.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { PaniersService } from 'src/paniers/paniers.service';

@Injectable()
export class LivrePanierService {
  constructor(
    @InjectRepository(LivrePanier)
    private readonly livrePanierRepository: Repository<LivrePanier>,
    private readonly livreService: LivresService,
    private readonly utilisateurService: UtilisateurService,
    private readonly panierService: PaniersService,
  ) {}

  async create(
    createLivrePanierDto: CreateLivrePanierDto,
  ): Promise<LivrePanier> {
    // Vérifiez si le livre existe
    const livre = await this.livreService.findOne(createLivrePanierDto.livreId);

    if (!livre) {
      throw new NotFoundException(
        `Livre with ID ${createLivrePanierDto.livreId} not found`,
      );
    }

    const utilisateur = await this.utilisateurService.findOne(
      createLivrePanierDto.utilisateurId,
    );

    if (!utilisateur) {
      throw new NotFoundException(
        `Utilisateur with ID ${createLivrePanierDto.utilisateurId} not found`,
      );
    }
    // Vérifiez si la quantité demandée est disponible

    // Vérifiez si le panier existe
    const panier = await this.panierService.findOne(
      createLivrePanierDto.panierId,
    );

    if (!panier) {
      throw new NotFoundException(
        `Panier with ID ${createLivrePanierDto.panierId} not found`,
      );
    }

    if (livre.qte < createLivrePanierDto.quantite) {
      throw new BadRequestException(
        `Quantité non disponible pour le livre avec ID ${livre.id}`,
      );
    }

    // Mettez à jour la quantité disponible du livre
    // livre.qte -= createLivrePanierDto.quantite;

    // Créez une nouvelle relation LivrePanier
    const nouvelleRelation = new LivrePanier();
    nouvelleRelation.livre = livre;
    nouvelleRelation.utilisateur = utilisateur;
    nouvelleRelation.panier = panier;
    nouvelleRelation.quantite = createLivrePanierDto.quantite;

    // Enregistrez la nouvelle relation dans la base de données
    await this.livrePanierRepository.save(nouvelleRelation);

    // // Mettez à jour le livre dans la base de données
    // await this.livreService.update(livre.id, livre);

    // Enregistrez la nouvelle relation dans la base de données
    return nouvelleRelation;
  }

  async findAll(): Promise<any[]> {
    return await this.livrePanierRepository
      .createQueryBuilder('livrePanier')
      .leftJoinAndSelect('livrePanier.utilisateur', 'utilisateur')
      .leftJoinAndSelect('livrePanier.livre', 'livre')
      .select([
        'utilisateur.nom',
        'utilisateur.prenom',
        'livre.titre',
        'livrePanier.quantite',
        'livrePanier.id',
        'livre.prix',
        'livre.qte',
        'livre.anneePublucation',
      ])
      .getRawMany();
  }

  async update(
    id: number,
    updateLivrePanierDto: UpdateLivrePanierDto,
  ): Promise<LivrePanier> {
    // Recherchez le livrePanier par ID
    const livrePanier = await this.livrePanierRepository.findOne({
      where: { id },
    });

    // Si le livrePanier n'est pas trouvé, lancez une exception
    if (!livrePanier) {
      throw new NotFoundException(`LivrePanier with ID ${id} not found`);
    }

    // Mettez à jour les propriétés du livrePanier avec les données du DTO
    if (updateLivrePanierDto.quantite) {
      livrePanier.quantite = updateLivrePanierDto.quantite;
    }

    // Enregistrez les modifications dans la base de données
    await this.livrePanierRepository.save(livrePanier);

    // Renvoyez le livrePanier mis à jour
    return livrePanier;
  }

  async remove(id: number): Promise<void> {
    // Recherchez le livrePanier par ID
    const livrePanier = await this.livrePanierRepository.findOne({
      where: { id },
    });

    // Si le livrePanier n'est pas trouvé, lancez une exception
    if (!livrePanier) {
      throw new NotFoundException(`LivrePanier with ID ${id} not found`);
    }

    // Supprimez le livrePanier de la base de données
    await this.livrePanierRepository.remove(livrePanier);
  }

  async findOne(id: number): Promise<any> {
    return await this.livrePanierRepository
      .createQueryBuilder('livrePanier')
      .leftJoinAndSelect('livrePanier.utilisateur', 'utilisateur')
      .leftJoinAndSelect('livrePanier.livre', 'livre')
      .where('livrePanier.id = :id', { id })
      .select([
        'utilisateur.nom',
        'utilisateur.prenom',
        'livre.titre',
        'livrePanier.quantite',
        'livrePanier.id',
        'livre.prix',
        'livre.qte',
        'livre.anneePublication',
      ])
      .getRawOne();
  }
}
