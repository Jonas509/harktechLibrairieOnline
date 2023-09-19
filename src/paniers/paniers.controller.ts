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
import { PaniersService } from './paniers.service';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { AuthorizeGuard } from 'src/utility/gouards/authorization.gourds';
import { AuthentificationGuard } from 'src/utility/gouards/authentification.guards';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('paniers')
@ApiTags('Paniers') // Étiquette Swagger pour ce contrôleur
export class PaniersController {
  constructor(private readonly paniersService: PaniersService) {}

  @Post()
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Créer un panier' })
  @ApiBody({ type: CreatePanierDto }) // Spécification du corps de la requête
  @ApiResponse({ status: 201, description: 'Le panier a été créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createPanierDto: CreatePanierDto) {
    return this.paniersService.create(createPanierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer la liste de tous les paniers' })
  @ApiResponse({ status: 200, description: 'Liste de tous les paniers récupérée avec succès.' })
  findAll() {
    return this.paniersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthorizeGuard) // Utilisation du garde AuthorizeGuard
  @ApiOperation({ summary: 'Récupérer un panier par ID' })
  @ApiParam({ name: 'id', description: 'ID du panier' })
  @ApiResponse({ status: 200, description: 'Panier récupéré avec succès.' })
  @ApiResponse({ status: 404, description: 'Panier non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.paniersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Mettre à jour un panier par ID' })
  @ApiParam({ name: 'id', description: 'ID du panier' })
  @ApiBody({ type: UpdatePanierDto }) // Spécification du corps de la requête
  @ApiResponse({ status: 200, description: 'Panier mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Panier non trouvé.' })
  update(@Param('id') id: string, @Body() updatePanierDto: UpdatePanierDto) {
    return this.paniersService.update(+id, updatePanierDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Supprimer un panier par ID' })
  @ApiParam({ name: 'id', description: 'ID du panier' })
  @ApiResponse({ status: 204, description: 'Panier supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Panier non trouvé.' })
  remove(@Param('id') id: string) {
    this.paniersService.remove(+id);
  }
}
