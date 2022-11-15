import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CustomError from 'src/exceptions/CustomError';
import { HashManager } from 'src/helpers/HashManager';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private userRepo: Repository<User>,
  ){}

  create(createUserDto: CreateUserDto) {
    const {name, login, password, role} = createUserDto;

    if (!name || !login || !password || !role){
      throw new CustomError(HttpStatus.UNPROCESSABLE_ENTITY, 'Campos incompletos.')
    }

    const hashedPass = new HashManager().createHash(createUserDto.password)
    createUserDto.password = hashedPass

    const user = this.userRepo.create(createUserDto)

    return this.userRepo.save(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
