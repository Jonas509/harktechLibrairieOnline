import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLivreCommandeDto } from './dto/create-livre-commande.dto';
import { UpdateLivreCommandeDto } from './dto/update-livre-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreCommande } from './entities/livre-commande.entity';
import { Repository } from 'typeorm';
import { LivresService } from 'src/livres/livres.service';
import { CommandeService } from 'src/commande/commande.service';

@Injectable()
export class LivreCommandeService {
  constructor(
    @InjectRepository(LivreCommande)
    private readonly livreCommandeRepository: Repository<LivreCommande>,
    private readonly livreService: LivresService,
    private readonly commandeService: CommandeService,
  ) {}

  async create(
    createLivreCommandeDto: CreateLivreCommandeDto,
  ): Promise<LivreCommande> {
    // Vérifiez si le livre existe
    const livre = await this.livreService.findOne(
      createLivreCommandeDto.livreId,
    );

    if (!livre) {
      throw new NotFoundException(
        `Livre with ID ${createLivreCommandeDto.livreId} not found`,
      );
    }

    // Vérifiez si la commande existe
    const commande = await this.commandeService.findOne(
      createLivreCommandeDto.commandeId,
    );

    if (!commande) {
      throw new NotFoundException(
        `Commande with ID ${createLivreCommandeDto.commandeId} not found`,
      );
    }

    if (livre.qte < createLivreCommandeDto.qte) {
      throw new BadRequestException(
        `Quantité non disponible pour le livre avec ID ${livre.id}`,
      );
    }

    // Créez une nouvelle relation LivreCommande
    const nouvelleRelation = new LivreCommande();
    nouvelleRelation.livre = livre;
    nouvelleRelation.commande = commande;
    nouvelleRelation.qte = createLivreCommandeDto.qte;

    // Mettez à jour la quantité disponible du livre
    livre.qte -= createLivreCommandeDto.qte;

    // Enregistrez la nouvelle relation et mettez à jour la quantité dans la base de données
    await this.livreCommandeRepository.save(nouvelleRelation);
    await this.livreService.update(livre.id, livre);

    return nouvelleRelation;
  }

  async findAll(): Promise<any[]> {
    return this.livreCommandeRepository
      .createQueryBuilder('livreCommande')
      .leftJoinAndSelect('livreCommande.livre', 'livre')
      .leftJoinAndSelect('livreCommande.commande', 'commande')
      .select([
        'livreCommande.id',
        'livreCommande.qte',
        'livre.titre', // Inclure uniquement les champs pertinents du livre
        'commande.date', // Inclure uniquement les champs pertinents de la commande
      ])
      .getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} livreCommande`;
  }

  update(id: number, updateLivreCommandeDto: UpdateLivreCommandeDto) {
    return `This action updates a #${id} livreCommande`;
  }

  remove(id: number) {
    return `This action removes a #${id} livreCommande`;
  }

  async findCommandesByDay(day: Date): Promise<any[]> {
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0); // Début de la journée

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999); // Fin de la journée

    return this.livreCommandeRepository
      .createQueryBuilder('livreCommande')
      .leftJoinAndSelect('livreCommande.livre', 'livre')
      .leftJoinAndSelect('livreCommande.commande', 'commande')
      .where('commande.date BETWEEN :startOfDay AND :endOfDay', {
        startOfDay,
        endOfDay,
      })
      .select([
        'livreCommande.id',
        'livreCommande.qte',
        'livre.titre', // Inclure uniquement les champs pertinents du livre
        'commande.date', // Inclure uniquement les champs pertinents de la commande
      ])
      .getRawMany();
  }
}
