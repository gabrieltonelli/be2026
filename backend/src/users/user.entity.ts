import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Contact } from '../contacts/contact.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    supabase_uid: string;

    @Column({ nullable: true })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.0 })
    global_rating: number;

    @Column({ default: false })
    is_premium: boolean;

    @Column({ default: false })
    hide_general_ratings: boolean;

    @Column({ type: 'json', nullable: true })
    selected_ambits: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Contact, (contact: Contact) => contact.user)
    contacts: Contact[];
}
