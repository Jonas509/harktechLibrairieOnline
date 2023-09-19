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
import { LivrePanierService } from './livre-panier.service';
import { CreateLivrePanierDto } from './dto/create-livre-panier.dto';
import { UpdateLivrePanierDto } from './dto/update-livre-panier.dto';
import { AuthorizeGuard } from 'src/utility/gouards/authorization.gourds';
import { AuthentificationGuard } from 'src/utility/gouards/authentification.guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('livre-panier')
@ApiTags('LivrePanier') // Étiquette Swagger pour ce contrôleur
@ApiBearerAuth()
export class LivrePanierController {
  constructor(private readonly livrePanierService: LivrePanierService) {}

  @Post()
  @UseGuards(AuthorizeGuard) // Utilisation du garde AuthorizeGuard
  @ApiOperation({ summary: 'Créer un livre dans le panier' })
  @ApiBody({ type: CreateLivrePanierDto }) // Spécification du corps de la requête
  @ApiResponse({
    status: 201,
    description: 'Livre créé dans le panier avec succès.',
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createLivrePanierDto: CreateLivrePanierDto) {
    return this.livrePanierService.create(createLivrePanierDto);
  }

  @Get()
  @UseGuards(AuthorizeGuard) // Utilisation du garde AuthorizeGuard
  @ApiOperation({
    summary: 'Obtenir la liste de tous les livres dans le panier',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste de livres récupérée avec succès.',
  })
  findAll() {
    return this.livrePanierService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Obtenir un livre dans le panier par ID' })
  @ApiParam({ name: 'id', description: 'ID du livre dans le panier' })
  @ApiResponse({
    status: 200,
    description: 'Livre dans le panier récupéré avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Livre dans le panier non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.livrePanierService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Mettre à jour un livre dans le panier par ID' })
  @ApiParam({ name: 'id', description: 'ID du livre dans le panier' })
  @ApiBody({ type: UpdateLivrePanierDto }) // Spécification du corps de la requête
  @ApiResponse({
    status: 200,
    description: 'Livre dans le panier mis à jour avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Livre dans le panier non trouvé.' })
  update(
    @Param('id') id: string,
    @Body() updateLivrePanierDto: UpdateLivrePanierDto,
  ) {
    return this.livrePanierService.update(+id, updateLivrePanierDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Supprimer un livre dans le panier par ID' })
  @ApiParam({ name: 'id', description: 'ID du livre dans le panier' })
  @ApiResponse({
    status: 204,
    description: 'Livre dans le panier supprimé avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Livre dans le panier non trouvé.' })
  remove(@Param('id') id: string) {
    this.livrePanierService.remove(+id);
  }
}
