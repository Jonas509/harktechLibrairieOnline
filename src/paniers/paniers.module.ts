import { Module } from '@nestjs/common';
import { PaniersService } from './paniers.service';
import { PaniersController } from './paniers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from './entities/panier.entity';

import { UtilisateurModule } from 'src/utilisateur/utilisateur.module';

@Module({
  imports: [TypeOrmModule.forFeature([Panier]), UtilisateurModule],
  providers: [PaniersService],
  controllers: [PaniersController],
  exports: [PaniersService],
})
export class PaniersModule {}
