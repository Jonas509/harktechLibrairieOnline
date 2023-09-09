import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

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
  @Redirect('/user/login')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async postLogin(@Body() body: LoginDto) {
    return await this.userService.postLogin(body);
  }

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
