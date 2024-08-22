import {
  Column,
  Entity,
  // JoinColumn,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Bill } from './bill.entity';

@Entity()
export class BillLines {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => Bill, (b) => b.lines)
  // @JoinColumn()
  // bill: Bill;

  @Column()
  name: string;

  @Column()
  price: number;
}
