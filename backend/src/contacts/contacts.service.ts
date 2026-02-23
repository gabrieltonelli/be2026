import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactsRepository: Repository<Contact>,
    ) { }

    findAllByUser(userId: number): Promise<Contact[]> {
        return this.contactsRepository.find({
            where: { user_id: userId, is_hidden: false },
        });
    }

    findOne(id: number): Promise<Contact> {
        return this.contactsRepository.findOne({ where: { id } });
    }

    create(contact: Partial<Contact>): Promise<Contact> {
        const newContact = this.contactsRepository.create(contact);
        return this.contactsRepository.save(newContact);
    }
}
