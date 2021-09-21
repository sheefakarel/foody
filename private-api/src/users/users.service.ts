import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(skip = 0, take = 25) {
    return this.usersRepository.find({
      skip,
      take,
    });
  }

  findOne(id: number) {
    let userInfo = this.usersRepository.findOneOrFail(id);
    if(!userInfo){
      return `User ID #${id} not found!`;
    }
    else{
      return userInfo;
    }
     
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ id }, updateUserDto);
    return this.usersRepository.findOneOrFail(id);
  }

  remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
