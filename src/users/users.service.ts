import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<any> {
    return await this.userRepository.find({where: {id: id}});
  }

  async findByCondition(object: Object): Promise<User> {
    return this.userRepository.findOne(object)
  }
  
  async findAllByCondition(object: Object): Promise<User[]> {
    return this.userRepository.find(object)
  }

  async update(id: number, data: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {id: id}
    })
    return this.userRepository.save({...user, ...data});
  }

  async create(object: UserDto): Promise<User> {
    const newUser = this.userRepository.create(object);
    return this.userRepository.save(object)
  }

  async delete(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.findByCondition({
      where: { email: email },
    })
  }

  async createUser(data: UserDto): Promise<User> {
    return this.create(data)
  }
}
