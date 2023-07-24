import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contacts } from 'src/models/contacts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/helper/auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts]), AuthModule, UserModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
