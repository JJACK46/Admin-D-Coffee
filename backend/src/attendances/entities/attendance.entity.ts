import { Exclude, Expose } from 'class-transformer';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  date: string;

  @ManyToOne(() => Employee, (emp) => emp.attendances, { eager: true })
  @JoinTable()
  @Exclude()
  employee: Employee;

  @Column()
  clockIn: string;

  @Column()
  clockOut: string;

  @Column()
  timeWorked: number;

  @Column()
  typeWork: TypeWork | string;

  @Expose()
  get employeeName(): string {
    return this.employee?.fullName;
  }
}
export type TypeWork = 'Missing' | 'Normal' | 'Normal/OT';
