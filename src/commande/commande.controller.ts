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
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { AuthentificationGuard } from 'src/utility/gouards/authentification.guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('commande')
@ApiTags('Commande') // Étiquette Swagger pour ce contrôleur
@ApiBearerAuth() // Pour indiquer que cette route nécessite une authentification (si applicable)
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiBody({ type: CreateCommandeDto }) // Spécification du corps de la requête
  @ApiResponse({ status: 201, description: 'Commande créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  }
  @Get()
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Liste des commandes' })
  @ApiResponse({ status: 200, description: 'Liste des commandes.' })
  findAll() {
    return this.commandeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Trouver une commande par ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande trouvée avec succès.' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Modifier une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiBody({ type: UpdateCommandeDto }) // Spécification du corps de la requête
  update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard) // Utilisation du garde d'authentification
  @ApiOperation({ summary: 'Supprimer une commande par ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 204, description: 'Commande supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  remove(@Param('id') id: string) {
    this.commandeService.remove(+id);
  }
}
