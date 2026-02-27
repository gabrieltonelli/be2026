import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambit } from '../ambits/ambit.entity';
import { Category } from '../ambits/category.entity';
import { Attribute } from '../ambits/attribute.entity';
import { User } from '../users/user.entity';
import { Contact } from '../contacts/contact.entity';
import { SEED_DATA } from './data/initial-seed';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Ambit) private ambitRepo: Repository<Ambit>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(Attribute) private attrRepo: Repository<Attribute>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Contact) private contactRepo: Repository<Contact>,
    ) { }

    async onApplicationBootstrap() {
        console.log('--- Checking for seed data ---');
        const ambitCount = await this.ambitRepo.count();
        if (ambitCount === 0) {
            console.log('Seeding initial data...');
            await this.runSeed();
            console.log('Seed completed successfully');
        } else {
            console.log('Skipping seed, data already exists');
        }
    }

    private async runSeed() {
        // 1. Seed Ambits, Categories and Attributes
        for (const ambitData of SEED_DATA.ambits) {
            const ambit = this.ambitRepo.create({
                name: ambitData.name,
                description: ambitData.description,
                icon: ambitData.icon,
                display_order: ambitData.display_order,
            });
            const savedAmbit = await this.ambitRepo.save(ambit);

            for (const catData of ambitData.categories) {
                const category = this.categoryRepo.create({
                    name: catData.name,
                    ambit_id: savedAmbit.id,
                    display_order: catData.display_order,
                });
                const savedCat = await this.categoryRepo.save(category);

                for (const attrData of catData.attributes) {
                    const attribute = this.attrRepo.create({
                        ...attrData,
                        category_id: savedCat.id,
                    });
                    await this.attrRepo.save(attribute);
                }
            }
        }

        // 2. Create a Mock User for development
        const mockUser = this.userRepo.create({
            supabase_uid: 'mock_uid_123',
            name: 'Gabriel Tonelli',
            email: 'gabriel@example.com',
            avatar_url: 'https://i.pravatar.cc/150?u=gabriel',
        });
        const savedUser = await this.userRepo.save(mockUser);

        // 3. Create some Mock Contacts
        const mockContacts = [
            { name: 'Juan Manuel', source: 'manual', color: '#10b981' },
            { name: 'María Garcia', source: 'manual', color: '#6366f1' },
            { name: 'Ricardo Fort', source: 'manual', color: '#f59e0b' },
        ];

        for (const c of mockContacts) {
            const contact = this.contactRepo.create({
                ...c,
                user_id: savedUser.id,
                avatar_url: `https://i.pravatar.cc/150?u=${c.name}`,
            });
            await this.contactRepo.save(contact);
        }
    }
}
