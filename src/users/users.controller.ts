import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.status)
    };
  }

  @Patch()
  @UseFilters(HttpExceptionFilter)
  async update(@Body() updateUserDto: UpdateUserDto) {
    try {
      const token = await this.usersService.update(updateUserDto);

      return token
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
