import { Promotion } from 'src/promotions/entities/promotion.entity';
import { ReceiptItem } from 'src/receipts/entities/receipt-item.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  imageName: string;

  @Column({ nullable: true })
  category: string;

  @ManyToMany(() => Promotion, (pro) => pro.usableProducts)
  usablePromotions: Promotion[];

  @OneToMany(() => ReceiptItem, (receiptItem) => receiptItem.product)
  receiptItem: ReceiptItem[];
}
