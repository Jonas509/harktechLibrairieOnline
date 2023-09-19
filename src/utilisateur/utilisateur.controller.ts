import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from './dto/user-signin.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthorizeRoles } from 'src/utility/decorator/autorize-roles.decorator';
import { UserRole } from 'src/utility/common/user-roles.enum';
import { AuthentificationGuard } from 'src/utility/gouards/authentification.guards';
import { AuthorizeGuard } from 'src/utility/gouards/authorization.gourds';
import { CurrentUser } from 'src/utility/decorator/current-users.decorator';


@Controller('utilisateur')
@ApiTags('Utilisateurs')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  @Post()
  create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
    return this.utilisateurService.create(createUtilisateurDto);
  }

  // @Get()
  // findAll() {
  //   return this.utilisateurService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.utilisateurService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  // ) {
  //   return this.utilisateurService.update(+id, updateUtilisateurDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(+id);
  }

  @Post('signin')
  @ApiOperation({ description: 'this is the endpoint for connect  a user' })
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<{
    token_access: string;
    user: Utilisateur;
  }> {
    const user = await this.utilisateurService.signin(signInUserDto);
    const token_access = await this.utilisateurService.token_access(user);

    return { token_access, user };
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  @Get()
  @ApiOperation({
    description:
      'this is the endpoint for retrieving all  users without filter',
  })
  @ApiResponse({ type: CreateUtilisateurDto, isArray: true })
  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAll();
  }

  @AuthorizeRoles(UserRole.Admin)
  @UseGuards(AuthentificationGuard, AuthorizeGuard)
  @Get(':id')
  @ApiOperation({
    description: 'this is the endpoint for retrieving  one user',
  })
  @ApiResponse({ type: CreateUtilisateurDto, isArray: false })
  @ApiParam({ name: 'id', type: 'number', description: 'id of user' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<Utilisateur> {
    return await this.utilisateurService.findOne(+id);
  }

  @UseGuards(AuthentificationGuard)
  @Get('me/profile')
  @ApiOperation({
    description: 'this is the endpoint for retrieving  active user profile',
  })
  @ApiResponse({ type: CreateUtilisateurDto, isArray: false })
  async viewProfile(
    @CurrentUser() currentUser: Utilisateur,
  ): Promise<Utilisateur> {
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return await this.utilisateurService.findOne(currentUser.id);
  }

  @UseGuards(AuthentificationGuard)
  @Patch()
  @ApiOperation({
    description: 'this is the endpoint for updating  active user profile',
  })
  @ApiResponse({ type: CreateUtilisateurDto, isArray: false })
  async update(
    @CurrentUser() currentUser: Utilisateur,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    if (!currentUser) {
      throw new NotFoundException('User not found');
    }
    return await this.utilisateurService.update(
      currentUser.id,
      updateUtilisateurDto,
    );
  }
}
