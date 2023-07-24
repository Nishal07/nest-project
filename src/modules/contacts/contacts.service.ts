import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from 'src/models/contacts.entity';
import { CreateContactsDto } from './dto/create-contacts.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepositoy: Repository<Contacts>,
  ) {}
  creatContact(
    createcontactsDto: CreateContactsDto,
    @Req() req,
  ): Promise<Contacts> {
    const contacts: Contacts = new Contacts();
    const { email, contactName, contactnumber } = createcontactsDto;
    contacts.email = email;
    contacts.contactName = contactName;
    contacts.contactnumber = contactnumber;
    contacts.user = req.id;
    return this.contactsRepositoy.save(contacts);
  }
  findAllContacts(): Promise<Contacts[]> {
    return this.contactsRepositoy.find();
  }
  findContacts(id): Promise<Contacts> {
    return this.contactsRepositoy.findOneBy({ id });
  }
  updateContacts(
    id: number,
    updatecontactsDto: UpdateContactsDto,
  ): Promise<Contacts> {
    const contacts: Contacts = new Contacts();
    contacts.email = updatecontactsDto.email;
    contacts.contactName = updatecontactsDto.contactName;
    contacts.contactnumber = updatecontactsDto.contactnumber;

    return this.contactsRepositoy.save(contacts);
  }
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.contactsRepositoy.delete({ id });
  }
}
