import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambit } from './ambit.entity';
import { Category } from './category.entity';
import { Attribute } from './attribute.entity';

@Injectable()
export class AmbitsService {
    constructor(
        @InjectRepository(Ambit)
        private ambitsRepository: Repository<Ambit>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        @InjectRepository(Attribute)
        private attributesRepository: Repository<Attribute>,
    ) { }

    findAll(): Promise<Ambit[]> {
        return this.ambitsRepository.find({
            relations: ['categories', 'categories.attributes'],
            order: { display_order: 'ASC' },
        });
    }

    findAttributesByAmbit(ambitId: number): Promise<Attribute[]> {
        return this.attributesRepository.find({
            where: { category: { ambit_id: ambitId } },
            relations: ['category'],
        });
    }
}
