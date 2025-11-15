import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessage } from '../../entities/contact-message.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: Partial<ContactMessage>) {
    return await this.contactService.create(createContactDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.contactService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contactService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.contactService.remove(+id);
  }
}