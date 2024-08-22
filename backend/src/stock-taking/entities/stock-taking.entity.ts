import { Exclude, Expose } from 'class-transformer';
import { Employee } from 'src/employees/entities/employee.entity';
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
export class StockTaking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date().toISOString() })
  createdDate: string;

  @Column({
    default: new Date().toLocaleTimeString('th-TH', { hour12: false }),
  })
  createdTime: string;

  @ManyToOne(() => Employee, (emp) => emp.stockTakings, { eager: true })
  @JoinColumn()
  @Exclude()
  employee: Employee;

  @ManyToOne(() => Inventory, (inv) => inv.stockTakingList, { eager: true })
  @Exclude()
  @JoinColumn()
  inventory: Inventory;

  @OneToMany(() => StockTakingItem, (stk) => stk.stockTaking, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
    eager: true,
  })
  stockTakingItems: StockTakingItem[];

  @Expose()
  get employeeName(): string {
    return this.employee?.fullName;
  }

  @Expose()
  get inventoryName(): string {
    return this.inventory?.name;
  }
}
