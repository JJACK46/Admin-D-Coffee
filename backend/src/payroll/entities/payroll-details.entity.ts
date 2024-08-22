import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Payroll } from './payroll.entity';

@Entity()
export class PayrollDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Payroll)
  payroll: Payroll;

  @Column()
  salaryWage: number;

  @Column()
  bonus: number;

  @Column()
  overtime: number;

  @Column()
  incentive: number;

  @Column()
  tax: number;

  @Column()
  socialSecurityFund: number;

  @Column()
  insurance: number;

  @Column()
  otherEarnings: number;

  @Column()
  otherDeduction: number;

  @Column()
  positionAllowance: number;

  @Column()
  absentLeaveLate: number;

  @Column()
  welfare: number;
}
