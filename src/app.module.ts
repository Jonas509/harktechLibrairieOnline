import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivresModule } from './livres/livres.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { PaniersModule } from './paniers/paniers.module';
import { LivrePanierModule } from './livre-panier/livre-panier.module';
import { CommandeModule } from './commande/commande.module';
import { LivreCommandeModule } from './livre-commande/livre-commande.module';

import { JwtModule } from '@nestjs/jwt';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { UserRole } from './utility/common/user-roles.enum';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Jonas509@',
      database: 'librairie2',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),

    JwtModule.register({
      secret: 'your-secret-key', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '1h' }, // Facultatif : options de signature JWT
    }),
    LivresModule,
    UtilisateurModule,
    PaniersModule,
    LivrePanierModule,
    CommandeModule,
    LivreCommandeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly utilisateurService: UtilisateurService) {}
  async onModuleInit() {
    try {
      const utilisateur = await this.utilisateurService.createDefaultUser();
      //console.log('Utilisateur administrateur créé avec succès.');
      // Assurez-vous que cet utilisateur a le rôle "administrateur"
      utilisateur.roles = [UserRole.Admin];
      // Sauvegardez l'utilisateur mis à jour
      await this.utilisateurService.update(utilisateur.id, utilisateur);
      await this.utilisateurService.updateUserRoles(utilisateur.id, [
        UserRole.Admin,
      ]);

      //console.log(utilisateur);
      return { message: 'Utilisateur administrateur créé avec succès' };
    } catch (error) {
      return {
        message:
          "Une erreur s'est produite lors de la création de l'utilisateur administrateur",
        error,
      };
    }
  }
}
