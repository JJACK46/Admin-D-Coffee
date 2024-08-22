import { Transform } from 'class-transformer';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { StockTaking } from 'src/stock-taking/entities/stock-taking.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StockTakingItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balanceOld: number;

  @Column()
  balanceUpdate: number;

  @ManyToOne(() => StockTaking, (stk) => stk.stockTakingItems)
  @JoinColumn()
  stockTaking: StockTaking;

  @ManyToOne(() => InventoryItem, (inv) => inv.stockTakingItems, {
    eager: true,
  })
  @Transform(({ value }) => ({
    id: value.id,
    ingredientName: value.ingredient?.name,
  }))
  inventoryItem: InventoryItem;
}
