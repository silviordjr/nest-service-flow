import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpException, Headers, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  create(@Body() createServiceDto: CreateServiceDto, @Headers('authorization') authorization: string) {
    try {
      return this.servicesService.create(createServiceDto, authorization);
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  findAll(@Query('page') page: number){
    try {
      if (!page){
        page = 1
      }

      return this.servicesService.findAll(page)
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
  

  @Patch(':id')
  @UseFilters(HttpExceptionFilter)
  async update(@Param('id') id: string, @Headers('authorization') authorization: string) {
    try {
      const service = await this.servicesService.update(id, authorization)

      return service
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
