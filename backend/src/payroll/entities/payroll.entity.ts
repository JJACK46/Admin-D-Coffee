import { Branch } from 'src/branch/entities/branch.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PayrollDetails } from './payroll-details.entity';

export type StatusPayment = 'paid' | 'pending';
@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Branch, (bra) => bra.payroll)
  @JoinColumn()
  branch: Branch;

  @ManyToOne(() => Employee, (emp) => emp.payroll)
  @JoinColumn()
  employee: Employee;

  @Column({ default: 'pending' })
  status: StatusPayment;

  @Column()
  dueDate: string;

  @Column({ nullable: true })
  paidDate: string;

  @Column()
  netEarnings: number;

  @Column()
  totalDeduction: number;

  @Column()
  totalEarnings: number;

  @OneToOne(() => PayrollDetails, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  payrollDetails: PayrollDetails;
}
