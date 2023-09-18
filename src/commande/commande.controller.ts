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

@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  @UseGuards(AuthentificationGuard)
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  }

  @Get()
  @UseGuards(AuthentificationGuard)
  findAll() {
    return this.commandeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthentificationGuard)
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard)
  update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard)
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
