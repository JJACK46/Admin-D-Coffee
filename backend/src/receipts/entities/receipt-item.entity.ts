import { Product } from 'src/products/entities/product.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReceiptItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Receipt, (rec) => rec.receiptItems)
  @JoinColumn()
  receipt: Receipt;

  @ManyToOne(() => Product, (product) => product.receiptItem, { eager: true })
  @JoinColumn()
  product: Product;

  @Column()
  amount: number;

  @Column()
  price: number;
}
