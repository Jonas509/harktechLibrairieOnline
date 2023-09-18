import { Commande } from 'src/commande/entities/commande.entity';
import { Livre } from 'src/livres/entities/livre.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LivreCommande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qte: number;

  @ManyToOne(() => Livre, (livre) => livre.commandes)
  livre: Livre;

  @ManyToOne(() => Commande, (commande) => commande.commandes)
  commande: Commande;
}
