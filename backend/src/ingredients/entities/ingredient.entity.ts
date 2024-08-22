import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { ReplenishmentItem } from 'src/replenishment/entities/replenishment-items.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unit: string;

  @OneToMany(() => InventoryItem, (i) => i.ingredient)
  inventoryItems: InventoryItem[];

  @OneToMany(() => ReplenishmentItem, (i) => i.ingredient)
  replenishmentItems: ReplenishmentItem[];
}
