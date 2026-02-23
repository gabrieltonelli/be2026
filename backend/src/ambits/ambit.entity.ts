import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';

@Entity('ambits')
export class Ambit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ length: 50, nullable: true })
    icon: string;

    @Column({ default: 0 })
    display_order: number;

    @Column({ default: true })
    is_active: boolean;

    @OneToMany(() => Category, (category) => category.ambit)
    categories: Category[];
}
