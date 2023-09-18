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
import { LivresService } from './livres.service';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { AuthorizeRoles } from 'src/utility/decorator/autorize-roles.decorator';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthentificationGuard } from 'src/utility/gouards/authentification.guards';
import { AuthorizeGuard } from 'src/utility/gouards/authorization.gourds';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SerializeIncludes } from 'src/utility/interceptors/serialize.interceptor';
import { Livre } from './entities/livre.entity';

@Controller('livres')
export class LivresController {
  constructor(private readonly livresService: LivresService) {}

  @Post()
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  @ApiOperation({ description: 'this is the endpoint for Creating  a book' })
  create(@Body() createLivreDto: CreateLivreDto) {
    return this.livresService.create(createLivreDto);
  }

  @SerializeIncludes(CreateLivreDto)
  @Get()
  @ApiOperation({
    description: 'cette methode affiche tout les livres',
  })
  @ApiResponse({ type: Livre, isArray: true })
  findAll() {
    return this.livresService.findAll();
  }

  @Get(':id')
  @SerializeIncludes(CreateLivreDto)
  @ApiOperation({
    description: 'cette methode affiche un livres',
  })
  @ApiResponse({ type: Livre, isArray: true })
  findOne(@Param('id') id: string) {
    return this.livresService.findOne(+id);
  }

  @Patch(':id')
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  @ApiOperation({ description: 'Cette methode permet de modifier un livre' })
  update(@Param('id') id: string, @Body() updateLivreDto: UpdateLivreDto) {
    return this.livresService.update(+id, updateLivreDto);
  }

  @Delete(':id')
  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  @ApiOperation({ description: 'Cette methode permet de supprimer un livre' })
  remove(@Param('id') id: string) {
    return this.livresService.remove(+id);
  }
}
