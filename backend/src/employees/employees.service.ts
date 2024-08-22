import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Branch } from 'src/branch/entities/branch.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
    @InjectRepository(Branch)
    private readonly repoBranch: Repository<Branch>,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const branch = await this.repoBranch.findOneByOrFail({
      id: createEmployeeDto.branchId,
    });

    const emp = {
      ...createEmployeeDto,
      branch: branch,
    };
    return this.repo.save(emp);
  }

  findAll() {
    return this.repo.find({ relations: { branch: true } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const existingEmployee = await this.repo.findOneBy({ id });

    if (!existingEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    const branch = await this.repoBranch.findOneByOrFail({
      id: updateEmployeeDto.branchId,
    });

    const emp = this.repo.create({
      id: existingEmployee.id,
      ...updateEmployeeDto,
      branch: branch,
    });
    return this.repo.update(id, emp);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
