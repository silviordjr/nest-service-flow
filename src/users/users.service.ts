import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CustomError from 'src/exceptions/CustomError';
import { Authenticator } from 'src/helpers/Authenticator';
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

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.find({
      where: {
        login: updateUserDto.login,
      }
    })

    if (!user){
      throw new CustomError(HttpStatus.UNPROCESSABLE_ENTITY, 'login ou senha invalidos.')
    }

    const passwordIsCorrect = new HashManager().compareHash(updateUserDto.password, user[0].password)

    if (!passwordIsCorrect){
      throw new CustomError(HttpStatus.UNPROCESSABLE_ENTITY, 'login ou senha invalidos.')
    }

    const token = new Authenticator().generateToken({
      id: user[0].id,
      role: user[0].role
    })

    return {token}
  }
}
