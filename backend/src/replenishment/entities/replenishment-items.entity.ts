import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Replenishment } from 'src/replenishment/entities/replenishment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReplenishmentItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Replenishment, (rep) => rep.replenishmentItems)
  @JoinColumn()
  replenishment: Replenishment;

  @ManyToOne(() => Ingredient, (ing) => ing.replenishmentItems, { eager: true })
  @JoinColumn()
  ingredient: Ingredient;

  @Column()
  balance: number;

  @Column()
  cost: number;
}
