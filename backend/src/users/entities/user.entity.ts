import { Exclude, Expose } from 'class-transformer';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Employee, { nullable: true })
  @JoinColumn()
  // @Exclude()
  employee: Employee;

  @OneToOne(() => Customer, { nullable: true })
  @JoinColumn()
  // @Exclude()
  customer: Customer;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn()
  role: Role;

  // @Expose()
  // get img() {
  //   if (this.employee) {
  //     return this.employee?.imageUrl;
  //   }
  //   return this.customer?.imageUrl;
  // }

  @Expose()
  get name(): string {
    if (this.employee) {
      return this.employee?.fullName;
    }
    return this.customer?.fullName;
  }

  // @Expose()
  // get cusId(): number {
  //   return this.customer?.id;
  // }

  // @Expose()
  // get empId(): number {
  //   return this.employee?.id;
  // }
}
