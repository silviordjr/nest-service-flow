import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CustomError from 'src/exceptions/CustomError';
import { Authenticator } from 'src/helpers/Authenticator';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ){}

  create(createServiceDto: CreateServiceDto, authorization: string) {
    if (!authorization){
      throw new CustomError(HttpStatus.UNAUTHORIZED, 'token invalido.')
    }

    const tokenData = new Authenticator().getTokenData(authorization)

    if (!tokenData){
      throw new CustomError(HttpStatus.UNAUTHORIZED, 'token invalido.')
    }

    const created = new Date()

    createServiceDto.client_id = tokenData.id
    createServiceDto.createdAt = created

    const service = this.serviceRepo.create(createServiceDto)

    return this.serviceRepo.save(service)
  }

  findAll(page: number){
    const offset = 10 * (page - 1);

    return this.serviceRepo.find({
      take: 10,
      skip: offset
    })
  }

  async update(id: string, authorization: string) {
    if (!authorization){
      throw new CustomError(HttpStatus.UNAUTHORIZED, 'token invalido.')
    }

    const tokenData = new Authenticator().getTokenData(authorization)

    if (!tokenData){
      throw new CustomError(HttpStatus.UNAUTHORIZED, 'token invalido.')
    }

    if (tokenData.role !== "PROFESSIONAL"){
      throw new CustomError(HttpStatus.FORBIDDEN, "Sem autorizacao.")
    }

    const service = await this.serviceRepo.findOne({
      where: {
        id,
      }
    })

    if (!service){
      throw new CustomError(HttpStatus.NOT_FOUND, "Servico nao encontrado.")
    }

    const updatedService = {
      updatedAt: new Date(),
      professionalId: tokenData.id
    }

    const updatedResult = await this.serviceRepo.update(id, updatedService)

    if (updatedResult.affected > 0){
      const upService = await this.serviceRepo.findOne({
        select: {id: true, name: true, amount: true, commission: true, createdAt: true, updatedAt: true, client_id: true, professionalId: true},
        where: {
          id,
        }
      })

      const created = new Date(upService.createdAt)
      const updated = new Date(upService.updatedAt)

      const timeDiff = Math.round(Math.abs(updated.getTime() - created.getTime())/(1000*60))

      const professionalInfos = {
        earnings: upService.amount * upService.commission,
        necessaryTime: timeDiff,
      }

      return {upService, professionalInfos}
    } else {
      throw new EntityNotFoundError(Service, id)
    }
  }
}
