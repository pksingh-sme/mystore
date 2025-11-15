import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from '../../entities/contact-message.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private contactRepository: Repository<ContactMessage>,
  ) {}

  async create(
    createContactDto: Partial<ContactMessage>,
  ): Promise<ContactMessage> {
    const contactMessage = this.contactRepository.create(createContactDto);
    return await this.contactRepository.save(contactMessage);
  }

  async findAll(): Promise<ContactMessage[]> {
    return await this.contactRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<ContactMessage | null> {
    return await this.contactRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
