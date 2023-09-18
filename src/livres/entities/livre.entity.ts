import { LivreCommande } from 'src/livre-commande/entities/livre-commande.entity';
import { LivrePanier } from 'src/livre-panier/entities/livre-panier.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Livre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @Column()
  anneePublucation: number;

  @Column()
  prix: number;

  @Column()
  qte: number;

  @Column()
  auteur: string;

  @Column()
  categorie: string;

  @OneToMany(() => LivreCommande, (commande) => commande.livre)
  commandes: LivreCommande[];

  @OneToMany(() => LivrePanier, (livre) => livre.livre)
  livrePanier: LivrePanier[];
}
