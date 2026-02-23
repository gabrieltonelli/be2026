import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Ambit } from './ambit.entity';
import { Attribute } from './attribute.entity';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ambit_id: number;

    @ManyToOne(() => Ambit, (ambit) => ambit.categories)
    @JoinColumn({ name: 'ambit_id' })
    ambit: Ambit;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: 0 })
    display_order: number;

    @OneToMany(() => Attribute, (attribute) => attribute.category)
    attributes: Attribute[];
}
