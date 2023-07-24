import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../models/user.entity';
import { AuthModule } from 'src/helper/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
