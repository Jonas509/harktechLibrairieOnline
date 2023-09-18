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

@Controller('livre-commande')
export class LivreCommandeController {
  constructor(private readonly livreCommandeService: LivreCommandeService) {}

  @Post()
  @UseGuards(AuthentificationGuard)
  create(@Body() createLivreCommandeDto: CreateLivreCommandeDto) {
    return this.livreCommandeService.create(createLivreCommandeDto);
  }

  @Get()
  @UseGuards(AuthentificationGuard)
  findAll() {
    return this.livreCommandeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthentificationGuard)
  findOne(@Param('id') id: string) {
    return this.livreCommandeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  update(
    @Param('id') id: string,
    @Body() updateLivreCommandeDto: UpdateLivreCommandeDto,
  ) {
    return this.livreCommandeService.update(+id, updateLivreCommandeDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  remove(@Param('id') id: string) {
    return this.livreCommandeService.remove(+id);
  }

  @Get('commandes/:day')
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  async findCommandesByDay(@Param('day') day: string) {
    const date = new Date(day);
    return this.livreCommandeService.findCommandesByDay(date);
  }
}
