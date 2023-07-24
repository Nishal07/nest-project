import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SingUpDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  async singUp(singUpDto: SingUpDto): Promise<{ token: string }> {
    const { name, email, password } = singUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: Users = new Users();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    const token = this.jwtService.sign({
      id: user.id,
    });
    return await this.userRepository.save(user), { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid Email OR password');
    }
    const token = this.jwtService.sign({
      id: user.id,
    });
    return { token };
  }
}
