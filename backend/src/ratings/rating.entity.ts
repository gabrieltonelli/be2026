import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique, Check } from 'typeorm';
import { User } from '../users/user.entity';
import { Contact } from '../contacts/contact.entity';
import { Attribute } from '../ambits/attribute.entity';

@Entity('ratings')
@Unique('unique_rating', ['from_user_id', 'to_contact_id', 'attribute_id'])
@Check('score_range', 'score BETWEEN 1 AND 5')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from_user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'from_user_id' })
    from_user: User;

    @Column()
    to_contact_id: number;

    @ManyToOne(() => Contact)
    @JoinColumn({ name: 'to_contact_id' })
    to_contact: Contact;

    @Column()
    attribute_id: number;

    @ManyToOne(() => Attribute)
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute;

    @Column({ type: 'tinyint' })
    score: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
