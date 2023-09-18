import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande]),
    TypeOrmModule.forFeature([Utilisateur]),
  ],
  providers: [CommandeService, UtilisateurService],
  controllers: [CommandeController],
  exports: [CommandeService],
})
export class CommandeModule {}
