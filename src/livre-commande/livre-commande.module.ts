import { Module } from '@nestjs/common';
import { LivreCommandeService } from './livre-commande.service';
import { LivreCommandeController } from './livre-commande.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreCommande } from './entities/livre-commande.entity';
import { LivresService } from 'src/livres/livres.service'; // Ne devrait pas être ici
import { CommandeService } from 'src/commande/commande.service'; // Ne devrait pas être ici
import { Livre } from 'src/livres/entities/livre.entity';
import { Commande } from 'src/commande/entities/commande.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LivreCommande, Livre, Commande, Utilisateur]), // Incluez le UtilisateurService ici
  ],
  controllers: [LivreCommandeController],
  providers: [
    LivresService,
    CommandeService,
    UtilisateurService,
    LivreCommandeService,
  ], // Incluez le UtilisateurService ici
  exports: [LivreCommandeService],
})
export class LivreCommandeModule {}
