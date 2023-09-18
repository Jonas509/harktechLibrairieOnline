import { Module } from '@nestjs/common';
import { LivrePanierService } from './livre-panier.service';
import { LivrePanierController } from './livre-panier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivrePanier } from './entities/livre-panier.entity';
import { LivresModule } from 'src/livres/livres.module';
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';
import { PaniersModule } from 'src/paniers/paniers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LivrePanier]),
    LivresModule,
    UtilisateurModule,
    PaniersModule,
  ],
  providers: [LivrePanierService],
  controllers: [LivrePanierController],
  exports: [LivrePanierService],
})
export class LivrePanierModule {}
