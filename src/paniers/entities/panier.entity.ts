import { Commande } from 'src/commande/entities/commande.entity';
import { LivrePanier } from 'src/livre-panier/entities/livre-panier.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => Utilisateur, (user) => user.panier)
  utilisateur: Utilisateur;

  @OneToMany(() => Commande, (commande) => commande.panier)
  commandes: Commande[];

  // Dans l'entité Panier
  @OneToMany(() => LivrePanier, (livrePanier) => livrePanier.panier)
  livrePanier: LivrePanier[];
}
