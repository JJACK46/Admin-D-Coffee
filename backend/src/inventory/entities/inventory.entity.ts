import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { Replenishment } from 'src/replenishment/entities/replenishment.entity';
import { StockTaking } from 'src/stock-taking/entities/stock-taking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Replenishment, (rep) => rep.inventory)
  replenishment: Replenishment[];

  @OneToMany(() => InventoryItem, (inv) => inv.inventory, {
    cascade: ['insert', 'remove', 'update'],
    onDelete: 'CASCADE',
    eager: true,
  })
  inventoryItems: InventoryItem[];

  @OneToMany(() => StockTaking, (stk) => stk.inventory)
  stockTakingList: StockTaking[];
}
