import { Injectable } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payroll } from './entities/payroll.entity';
import { Repository } from 'typeorm';
import { PayrollDetails } from './entities/payroll-details.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly repo: Repository<Payroll>,
    @InjectRepository(PayrollDetails)
    private readonly repoItem: Repository<PayrollDetails>,
    @InjectRepository(Branch)
    private readonly repoBranch: Repository<Branch>,
    @InjectRepository(Employee)
    private readonly repoEmp: Repository<Employee>,
  ) {}

  async create(dto: CreatePayrollDto) {
    const branch = await this.repoBranch.findOneByOrFail({ id: dto.branchId });
    const emp = await this.repoEmp.findOneByOrFail({ id: dto.employeeId });
    const details = await this.repoItem.create(dto.payrollDetails);

    const pay = this.repo.create({
      branch: branch,
      employee: emp,
      payrollDetails: details,
      ...dto,
    });

    return this.repo.save(pay);
  }

  findAllPending() {
    return this.repo.find({
      where: {
        status: 'pending',
      },
      relations: { branch: true, employee: true, payrollDetails: true },
    });
  }

  findAllPaid() {
    return this.repo.find({
      where: {
        status: 'paid',
      },
      relations: { branch: true, employee: true, payrollDetails: true },
    });
  }

  findWhereEmpId(id: number) {
    return this.repo.find({
      where: {
        status: 'paid',
        employee: {
          id,
        },
      },
      relations: { payrollDetails: true },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id: id },
      relations: { branch: true, employee: true, payrollDetails: true },
    });
  }

  async update(id: number, dto: UpdatePayrollDto) {
    const existPay = await this.repo.findOneBy({ id: id });
    if (existPay) {
      const details = await this.repoItem.create(dto.payrollDetails);

      (existPay.status = 'paid'), (existPay.payrollDetails = details);

      return this.repo.save(existPay);
    }
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
