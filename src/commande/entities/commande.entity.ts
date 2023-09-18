import { LivreCommande } from 'src/livre-commande/entities/livre-commande.entity';
import { Panier } from 'src/paniers/entities/panier.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatutCommande } from '../enums/order-status.enum';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  montant: number;

  @Column({
    type: 'enum',
    enum: StatutCommande,
    default: StatutCommande.EN_ATTENTE,
  })
  etat: string;

  @ManyToOne(() => Utilisateur, (user) => user.commandes)
  utilisateur: Utilisateur;

  @OneToMany(() => LivreCommande, (commande) => commande.commande)
  commandes: LivreCommande[];

  @OneToMany(() => Panier, (panier) => panier.commandes)
  panier: Panier[];
}
