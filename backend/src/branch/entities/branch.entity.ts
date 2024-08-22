import { Bill } from 'src/bills/entities/bill.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Payroll } from 'src/payroll/entities/payroll.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ default: new Date().toLocaleDateString('fr-CA') })
  createdDate: string;

  @OneToMany(() => Receipt, (rec) => rec.branch)
  receipts: Receipt[];

  @OneToMany(() => Payroll, (pay) => pay.branch)
  payroll: Payroll[];

  @OneToMany(() => Bill, (b) => b.branch)
  Bill: Bill[];

  @OneToOne(() => Inventory, {
    cascade: ['insert', 'remove', 'update'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  inventory: Inventory;
}
