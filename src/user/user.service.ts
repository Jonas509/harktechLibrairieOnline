import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    try {
      const { username, email, password } = body;

      // Vérifiez si l'username existe déjà
      const existingUsername = await this.usersRepository.findOne({
        where: { username },
      });
      if (existingUsername) {
        return "Nom d'utilisateur déjà utilisé.";
      }

      // Vérifiez si l'email existe déjà
      const existingEmail = await this.usersRepository.findOne({
        where: { email },
      });
      if (existingEmail) {
        return 'Adresse email déjà utilisée.';
      }

      // Si ni l'username ni l'email n'existent, hachez le mot de passe et créez l'utilisateur
      const hash = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({ ...body, password: hash });
      await this.usersRepository.save(user);
      return 'Utilisateur créé avec succès.';
    } catch (error) {
      // Gérez les erreurs ici
      return "Une erreur s'est produite lors de la création de l'utilisateur.";
    }
  }

  async postLogin(body: LoginDto) {
    const { username, password } = body;

    const user = await this.usersRepository.findOne({
      where: [{ username }],
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
