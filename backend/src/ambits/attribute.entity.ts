import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('attributes')
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number;

    @ManyToOne(() => Category, (category) => category.attributes)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ length: 100 })
    positive_term: string;

    @Column({ length: 100 })
    negative_term: string;

    @Column({ length: 50, nullable: true })
    icon: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: 0 })
    display_order: number;
}
