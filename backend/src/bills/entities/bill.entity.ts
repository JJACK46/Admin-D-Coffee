import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { BillLines } from './bill-line.entity';
import { Branch } from 'src/branch/entities/branch.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  worth: number;

  @Column({ default: false })
  status: boolean;

  @Column()
  type: string;

  @ManyToOne(() => Branch, (bra) => bra.Bill)
  @JoinColumn()
  branch: Branch;

  // @OneToMany(() => BillLines, (bl) => bl.bill, {
  //   cascade: ['insert', 'remove'],
  // })
  // lines: BillLines[];
}
