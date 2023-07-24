import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../../models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { name, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: Users = new Users();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  viewUser(id: number): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }

  findOne(name: string): Promise<Users> {
    return this.userRepository.findOneBy({ name });
  }
}
