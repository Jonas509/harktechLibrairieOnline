import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  @Render('user/login')
  login() {}

  @Get('/sign')
  @Render('user/sign')
  Signup() {}

  @Get('/admin')
  @Render('user/admin')
  admin() {}

  @Post('/sign')
  create(@Body() body: any) {
    this.userService.create(body);
  }

  // @Post('/sign')
  // async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
  //   // Appelez le service pour créer un nouvel utilisateur en utilisant les données du formulaire
  //   const user = await this.userService.create(createUserDto);

  //   // Redirigez l'utilisateur vers une autre page
  //   res.setHeader('Location', 'login'); // Spécifiez l'URL de redirection
  //   res.statusCode = 302; // Code de redirection HTTP

  //   // Rendez une vue EJS différente après la redirection (facultatif)
  //   res.render('login', { user }); // Utilisez la vue EJS 'autre-vue' avec des données (si nécessaire)

  //   // Si vous ne souhaitez pas rendre de vue après la redirection, vous pouvez simplement utiliser :
  //   // res.end();

  //   // Note : La redirection se produira lorsque la réponse sera renvoyée au client.
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
