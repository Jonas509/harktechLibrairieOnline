import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { SignInUserDto } from './dto/user-signin.dto';
import { defaultUserConfig } from 'src/config/config';
import { UserRole } from 'src/utility/common/user-roles.enum';
import config1 from 'src/config/config1';
import * as jwt from 'jsonwebtoken'; // Importez le module JWT

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async findOneByEmail(email: string): Promise<Utilisateur> {
    const user = await this.utilisateurRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    // Validez les données du DTO
    const errors = await validate(createUtilisateurDto);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    // Vérifiez si l'email existe déjà dans la base de données
    const existingUser = await this.utilisateurRepository.findOne({
      where: { email: createUtilisateurDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Cet email est déjà utilisé par un autre utilisateur',
      );
    }

    // Créez un nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      createUtilisateurDto.password,
      salt,
    );

    // Créez un nouveau utilisateur
    const newUtilisateur = new Utilisateur();
    newUtilisateur.nom = createUtilisateurDto.nom;
    newUtilisateur.prenom = createUtilisateurDto.prenom;
    newUtilisateur.email = createUtilisateurDto.email;
    newUtilisateur.password = hashedPassword;

    newUtilisateur.photo = createUtilisateurDto.photo;
    newUtilisateur.commandes = [];
    newUtilisateur.panier = [];

    // Créez un nouveau utilisateur dans la base de données
    return this.utilisateurRepository.save(newUtilisateur);
  }

  async findAll(): Promise<Utilisateur[]> {
    const utilisateur = await this.utilisateurRepository.find();
    return utilisateur;
  }

  async findOne(id: number): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id },
    });
    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur with ID ${id} not found`);
    }
    return utilisateur;
  }

  async update(
    id: number,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    // Récupérez l'utilisateur existant par son ID
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id },
    });

    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur with ID ${id} not found`);
    }

    // Appliquez les mises à jour à l'utilisateur existant
    if (updateUtilisateurDto.nom !== undefined) {
      utilisateur.nom = updateUtilisateurDto.nom;
    }
    if (updateUtilisateurDto.prenom !== undefined) {
      utilisateur.prenom = updateUtilisateurDto.prenom;
    }
    if (updateUtilisateurDto.email !== undefined) {
      utilisateur.email = updateUtilisateurDto.email;
    }

    if (updateUtilisateurDto.photo !== undefined) {
      utilisateur.photo = updateUtilisateurDto.photo;
    }
    if (updateUtilisateurDto.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        updateUtilisateurDto.password,
        salt,
      );
      utilisateur.password = hashedPassword;
    }

    // Créez un nouveau utilisateur dans la base de données
    return this.utilisateurRepository.save(utilisateur);
  }

  async remove(id: number): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id },
    });
    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur with ID ${id} not found`);
    }
    return this.utilisateurRepository.remove(utilisateur);
  }

  async signin(signInUserDto: SignInUserDto): Promise<Utilisateur> {
    const userExists = await this.utilisateurRepository
      .createQueryBuilder('utilisateur')
      .addSelect('utilisateur.password')
      .where('utilisateur.email = :email', { email: signInUserDto.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Invalid email');
    const passwordIsValid = await bcrypt.compare(
      signInUserDto.password,
      userExists.password,
    );
    if (!passwordIsValid) throw new BadRequestException('Invalid Password');
    delete userExists.password;
    return userExists;
  }
  async token_access(user: Utilisateur): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    const token = jwt.sign(payload, config1.jwtSecret); // Utilisez la clé secrète de la configuration
    return token;
  }

  async createDefaultUser(): Promise<Utilisateur> {
    const existingUser = await this.utilisateurRepository.findOne({
      where: { email: defaultUserConfig.email },
    });

    if (existingUser) {
      // L'utilisateur par défaut existe déjà, vous pouvez gérer cela comme vous le souhaitez
      return existingUser;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultUserConfig.password, salt);

    const newUser = new Utilisateur();
    newUser.nom = defaultUserConfig.nom;
    newUser.prenom = defaultUserConfig.prenom;
    newUser.email = defaultUserConfig.email;
    newUser.password = hashedPassword;

    return this.utilisateurRepository.save(newUser);
  }
  async updateUserRoles(id: number, roles: UserRole[]): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id },
    });
    if (!utilisateur) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }

    utilisateur.roles = roles;
    return this.utilisateurRepository.save(utilisateur);
  }
}
