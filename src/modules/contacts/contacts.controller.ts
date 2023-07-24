import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { CreateContactsDto } from './dto/create-contacts.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createcontactDto: CreateContactsDto, @Req() req) {
    return this.contactsService.creatContact(createcontactDto, req.user);
  }

  @Get()
  find() {
    return this.contactsService.findAllContacts();
  }

  @Get(':id')
  findAll(@Param('id') id: number) {
    return this.contactsService.findContacts(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatecontactsDto: UpdateContactsDto,
  ) {
    return this.contactsService.updateContacts(+id, updatecontactsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.removeUser(+id);
  }
}
