import { Exclude, Expose, Transform } from 'class-transformer';
import { Branch } from 'src/branch/entities/branch.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { ReceiptItem } from 'src/receipts/entities/receipt-item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ReceiptItem, (rec) => rec.receipt, {
    cascade: ['insert', 'remove'],
    eager: true,
  })
  @JoinTable()
  @Exclude()
  receiptItems: ReceiptItem[];

  @ManyToOne(() => Promotion, (pro) => pro.receipt, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  @Transform(({ value }) => {
    if (value) {
      return {
        id: value.id,
        name: value.name,
        discountPercentage: value.discountPercentage,
      };
    }
  })
  promotion: Promotion;

  @Column()
  totalPrice: number;

  @Column()
  totalDiscount: number;

  @Column()
  totalNet: number;

  @Column()
  receivedAmount: number;

  @Column()
  change: number;

  @ManyToOne(() => Employee, (emp) => emp.receipts)
  @JoinColumn()
  @Exclude()
  employee: Employee;

  @ManyToOne(() => Branch, (branch) => branch.receipts, { eager: true })
  @JoinColumn()
  @Exclude()
  branch: Branch;

  @ManyToOne(() => Customer, (customer) => customer.receipts, {
    nullable: true,
  })
  @JoinColumn()
  @Transform(({ value }) => {
    if (value) {
      return {
        id: value.id,
        fullName: value.fullName,
        point: value.point,
      };
    }
  })
  customer: Customer;

  @Column({ default: new Date().toISOString().slice(0, 10) })
  createdDate: string;

  @Column({
    default: new Date().toLocaleTimeString('th-TH', { hour12: false }),
  })
  createdTime: string;

  @Column()
  paymentType: string;

  @Column({ default: 0 })
  usedPoint: number;

  @Column({ default: 0 })
  earnPoint: number;

  @Column({ default: 0 })
  totalPoint: number;

  @Expose()
  get employeeName() {
    return this.employee?.fullName;
  }

  @Expose()
  get branchName() {
    return this.branch?.name;
  }

  @Expose()
  get receiptItemsShort() {
    const items = this.receiptItems?.map((item) => ({
      amount: item.amount,
      name: item.product?.name,
      price: item.price,
    }));
    return items;
  }
}
