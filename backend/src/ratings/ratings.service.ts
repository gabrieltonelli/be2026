import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private ratingsRepository: Repository<Rating>,
    ) { }

    create(rating: Partial<Rating>): Promise<Rating> {
        const newRating = this.ratingsRepository.create(rating);
        return this.ratingsRepository.save(newRating);
    }

    findByContact(contactId: number): Promise<Rating[]> {
        return this.ratingsRepository.find({
            where: { to_contact_id: contactId },
            relations: ['attribute'],
        });
    }
}
