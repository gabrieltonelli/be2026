import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Ambit } from '../ambits/ambit.entity';
import { Category } from '../ambits/category.entity';
import { Attribute } from '../ambits/attribute.entity';
import { User } from '../users/user.entity';
import { Contact } from '../contacts/contact.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ambit, Category, Attribute, User, Contact]),
    ],
    providers: [SeedService],
    exports: [SeedService],
})
export class SeedModule { }
