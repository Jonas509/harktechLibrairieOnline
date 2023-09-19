import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LivreCommandeService } from './livre-commande.service';
import { CreateLivreCommandeDto } from './dto/create-livre-commande.dto';
import { UpdateLivreCommandeDto } from './dto/update-livre-commande.dto';
import { AuthentificationGuard } from 'src/utility/gouards/authentification.guards';
import { AuthorizeGuard } from 'src/utility/gouards/authorization.gourds';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorizeRoles } from 'src/utility/decorator/autorize-roles.decorator';
import { UserRole } from 'src/utility/common/user-roles.enum';

@Controller('livre-commande')
@ApiTags('LivreCommande') // Étiquette Swagger pour ce contrôleur
@ApiBearerAuth() // Pour indiquer que cette route nécessite une authentification (si applicable)
export class LivreCommandeController {
  constructor(private readonly livreCommandeService: LivreCommandeService) {}

  @Post()
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Créer un livre dans la commande' })
  @ApiBody({ type: CreateLivreCommandeDto }) // Spécification du corps de la requête
  @ApiResponse({
    status: 201,
    description: 'Livre créé dans la commande avec succès.',
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createLivreCommandeDto: CreateLivreCommandeDto) {
    return this.livreCommandeService.create(createLivreCommandeDto);
  }

  @Get()
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({
    summary: 'Obtenir la liste de tous les livres dans la commande',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste de livres récupérée avec succès.',
  })
  findAll() {
    return this.livreCommandeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Obtenir un livre dans la commande par ID' })
  @ApiParam({ name: 'id', description: 'ID du livre dans la commande' })
  @ApiResponse({
    status: 200,
    description: 'Livre dans la commande récupéré avec succès.',
  })
  @ApiResponse({
    status: 404,
    description: 'Livre dans la commande non trouvé.',
  })
  findOne(@Param('id') id: string) {
    return this.livreCommandeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard, AuthorizeGuard) // Utilisation des gardes d'authentification et d'autorisation
  @ApiOperation({ summary: 'Mettre à jour un livre dans la commande par ID' })
  @ApiParam({ name: 'id', description: 'ID du livre dans la commande' })
  @ApiBody({ type: UpdateLivreCommandeDto }) // Spécification du corps de la requête
  @ApiResponse({
    status: 200,
    description: 'Livre dans la commande mis à jour avec succès.',
  })
  @ApiResponse({
    status: 404,
    description: 'Livre dans la commande non trouvé.',
  })
  update(
    @Param('id') id: string,
    @Body() updateLivreCommandeDto: UpdateLivreCommandeDto,
  ) {
    return this.livreCommandeService.update(+id, updateLivreCommandeDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard, AuthorizeGuard) // Utilisation des gardes d'authentification et d'autorisation
  @ApiOperation({ summary: 'Supprimer un livre dans la commande par ID' })
  @ApiParam({ name: 'id', description: 'ID du livre dans la commande' })
  @ApiResponse({
    status: 204,
    description: 'Livre dans la commande supprimé avec succès.',
  })
  @ApiResponse({
    status: 404,
    description: 'Livre dans la commande non trouvé.',
  })
  remove(@Param('id') id: string) {
    this.livreCommandeService.remove(+id);
  }

  @Get('commandes/:day')
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard, AuthorizeGuard) // Utilisation des gardes d'authentification et d'autorisation
  @ApiOperation({ summary: 'Trouver les commandes pour une date spécifique' })
  @ApiParam({
    name: 'day',
    description: 'Date au format ISO 8601 (YYYY-MM-DD)',
  })
  @ApiResponse({ status: 200, description: 'Commandes trouvées avec succès.' })
  @ApiResponse({
    status: 404,
    description: 'Aucune commande trouvée pour la date spécifiée.',
  })
  async findCommandesByDay(@Param('day') day: string) {
    const date = new Date(day);
    return this.livreCommandeService.findCommandesByDay(date);
  }
}
