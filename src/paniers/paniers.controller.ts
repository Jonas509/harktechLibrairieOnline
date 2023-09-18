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

@Controller('paniers')
export class PaniersController {
  constructor(private readonly paniersService: PaniersService) {}

  @Post()
  @UseGuards(AuthentificationGuard)
  create(@Body() createPanierDto: CreatePanierDto) {
    return this.paniersService.create(createPanierDto);
  }

  @Get()
  findAll() {
    return this.paniersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthorizeGuard)
  findOne(@Param('id') id: string) {
    return this.paniersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard)
  update(@Param('id') id: string, @Body() updatePanierDto: UpdatePanierDto) {
    return this.paniersService.update(+id, updatePanierDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard)
  remove(@Param('id') id: string) {
    return this.paniersService.remove(+id);
  }
}
