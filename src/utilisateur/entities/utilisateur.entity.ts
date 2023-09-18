import { Commande } from 'src/commande/entities/commande.entity';
import { LivrePanier } from 'src/livre-panier/entities/livre-panier.entity';
import { Panier } from 'src/paniers/entities/panier.entity';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column({ type: 'enum', enum: UserRole, default: [UserRole.Client] })
  roles: UserRole[];

  @OneToMany(() => Commande, (commande) => commande.utilisateur)
  commandes: Commande[];

  @OneToMany(() => Panier, (panier) => panier.utilisateur)
  panier: Panier[];

  @OneToMany(() => LivrePanier, (livrePanier) => livrePanier.utilisateur)
  livrePanier: LivrePanier[];
}
