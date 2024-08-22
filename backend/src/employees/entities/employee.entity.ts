import { Expose, Transform } from 'class-transformer';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Payroll } from 'src/payroll/entities/payroll.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Replenishment } from 'src/replenishment/entities/replenishment.entity';
import { StockTaking } from 'src/stock-taking/entities/stock-taking.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (branch) => branch.id)
  @JoinColumn()
  @Transform(({ value }) => value.name)
  branch: Branch;

  @OneToMany(() => Payroll, (pay) => pay.employee)
  payroll: Payroll[];

  // @OneToOne(() => User, (user) => user.employee, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   nullable: true,
  // })
  // user?: User;

  @OneToMany(() => Receipt, (rec) => rec.employee)
  receipts: Receipt[];

  @OneToMany(() => Attendance, (att) => att.employee)
  attendances: Attendance[];

  @OneToMany(() => StockTaking, (stk) => stk.employee)
  stockTakings: StockTaking[];

  @OneToMany(() => Replenishment, (rep) => rep.employee)
  replenishment: Replenishment[];

  @Column()
  title: string;

  @Column()
  salaryWage: number;

  @Column()
  minWorkHour: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 10 })
  tel: string;

  @Column()
  gender: string;

  @Column()
  birthDate: string;

  @Column()
  biography: string;

  @Column()
  startDate: string;

  @Column({ default: 'no-image.png' })
  imageUrl: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
