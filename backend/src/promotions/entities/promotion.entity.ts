import { Exclude, Expose, Transform } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, (pro) => pro.usablePromotions)
  @JoinTable({ name: 'promotion_contain_products' })
  @Exclude()
  usableProducts: Product[];

  @ManyToMany(() => Product, (pro) => pro.usablePromotions)
  @JoinTable({ name: 'promotion_contain_products' })
  @Transform(({ value }) => value.map((product) => product.id))
  usableCategory: Product[];

  @Column({ default: false })
  combo: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  discountPercentage: number;

  @Column({ default: new Date().toLocaleDateString('fr-CA') })
  createdDate: string;

  @Column()
  endDate: string;

  @OneToMany(() => Receipt, (rec) => rec.promotion)
  receipt: Receipt[];

  @Expose()
  get usableProductsId(): number[] {
    return this.usableProducts?.map((product) => product.id);
  }

  @Expose()
  get usableProductsName(): string[] {
    return this.usableProducts?.map((product) => product.name);
  }
}
