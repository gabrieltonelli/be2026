import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, (user) => user.contacts)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['facebook', 'google', 'linkedin', 'instagram', 'twitter', 'manual'] })
    source: string;

    @Column({ nullable: true })
    source_id: string;

    @Column({ nullable: true })
    avatar_url: string;

    @Column({ default: false })
    is_hidden: boolean;

    @Column({ default: false })
    is_favorite: boolean;

    @Column({ type: 'json', nullable: true })
    groups: any;

    @CreateDateColumn()
    created_at: Date;
}
