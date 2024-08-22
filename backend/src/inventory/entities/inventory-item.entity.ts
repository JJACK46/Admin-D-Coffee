import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { StockTakingItem } from 'src/stock-taking/entities/stock-taking-item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, (ing) => ing.inventoryItems, { eager: true })
  @JoinColumn()
  ingredient: Ingredient;

  @ManyToOne(() => Inventory, (inv) => inv.inventoryItems)
  @JoinColumn()
  inventory: Inventory;

  @Column()
  balance: number;

  @Column()
  minBalance: number;

  @OneToMany(() => StockTakingItem, (stk) => stk.inventoryItem)
  stockTakingItems: StockTakingItem[];
}
