import { Expose } from 'class-transformer';
import { Receipt } from 'src/receipts/entities/receipt.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  tel: string;

  @Column({ default: 0, type: 'int' })
  point: number;

  @Column()
  birthDate: string;

  @Column({ default: new Date().toLocaleDateString('fr-CA') })
  createdDate: string;

  @Column({ default: 'no-image.png' })
  imageUrl: string;

  @OneToMany(() => Receipt, (rec) => rec.customer)
  receipts: Receipt[];

  @Expose()
  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
