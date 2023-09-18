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

@Controller('livre-panier')
export class LivrePanierController {
  constructor(private readonly livrePanierService: LivrePanierService) {}

  @Post()
  @UseGuards(AuthorizeGuard)
  create(@Body() createLivrePanierDto: CreateLivrePanierDto) {
    return this.livrePanierService.create(createLivrePanierDto);
  }

  @Get()
  @UseGuards(AuthorizeGuard)
  findAll() {
    return this.livrePanierService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthentificationGuard)
  findOne(@Param('id') id: string) {
    return this.livrePanierService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthentificationGuard)
  update(
    @Param('id') id: string,
    @Body() updateLivrePanierDto: UpdateLivrePanierDto,
  ) {
    return this.livrePanierService.update(+id, updateLivrePanierDto);
  }

  @Delete(':id')
  @UseGuards(AuthentificationGuard)
  remove(@Param('id') id: string) {
    return this.livrePanierService.remove(+id);
  }
}
