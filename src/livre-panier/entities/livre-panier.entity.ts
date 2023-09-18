import { Livre } from 'src/livres/entities/livre.entity';
import { Panier } from 'src/paniers/entities/panier.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LivrePanier {
  @PrimaryGeneratedColumn()
  id: number;

  // Dans l'entité LivrePanier
  @ManyToOne(() => Livre, (livre) => livre.livrePanier)
  livre: Livre;

  // Dans l'entité LivrePanier
  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.livrePanier)
  utilisateur: Utilisateur;

  @ManyToOne(() => Panier, (panier) => panier.livrePanier)
  panier: Panier;

  @Column()
  quantite: number;
}
