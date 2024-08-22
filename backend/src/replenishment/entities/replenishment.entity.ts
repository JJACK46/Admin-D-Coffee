import { Exclude, Expose } from 'class-transformer';
import { Employee } from 'src/employees/entities/employee.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { ReplenishmentItem } from 'src/replenishment/entities/replenishment-items.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Replenishment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date().toISOString().slice(0, 10) })
  createdDate: string;

  @Column({
    default: new Date().toLocaleTimeString('th-TH', { hour12: false }),
  })
  createdTime: string;

  @ManyToOne(() => Employee, (emp) => emp.replenishment, { eager: true })
  @JoinColumn()
  @Exclude()
  employee: Employee;

  @Column()
  totalCost: number;

  @OneToMany(() => ReplenishmentItem, (rep) => rep.replenishment, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
    eager: true,
  })
  replenishmentItems: ReplenishmentItem[];

  @ManyToOne(() => Inventory, (inv) => inv.replenishment, { eager: true })
  @JoinColumn()
  @Exclude()
  inventory: Inventory;

  @Expose()
  get employeeFullName(): string {
    return this.employee?.fullName;
  }

  @Expose()
  get inventoryName(): string {
    return this.inventory?.name;
  }
}
