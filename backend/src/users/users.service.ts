import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    readonly repo: Repository<User>,
    @InjectRepository(Role)
    readonly repoRole: Repository<Role>,
    @InjectRepository(Employee)
    readonly repoEmp: Repository<Employee>,
    @InjectRepository(Customer)
    readonly repoCus: Repository<Customer>,
  ) {}

  async create(dto: CreateUserDto) {
    const role = await this.repoRole.findOneByOrFail({ id: dto.roleId });
    let emp;
    let cus;
    if (dto.employeeId) {
      emp = await this.repoEmp.findOneBy({
        id: dto.employeeId,
      });
    }
    if (dto.customerId) {
      cus = await this.repoCus.findOneBy({
        id: dto.customerId,
      });
    }

    const user = this.repo.create({
      ...dto,
      password: bcrypt.hashSync(dto.password, 10),
      role: role,
      employee: emp,
      customer: cus,
    });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({
      relations: {
        employee: { branch: true },
        customer: true,
        role: true,
      },
    });
  }

  findOneById(id: number) {
    try {
      return this.repo.findOne({
        where: { id },
        relations: {
          employee: true,
          customer: true,
          role: true,
        },
      });
    } catch (error) {
      throw new Error('' + error);
    }
  }

  findOneByName(username: string) {
    try {
      return this.repo.findOne({
        where: { username },
        relations: {
          employee: { branch: true },
          customer: true,
          role: true,
        },
      });
    } catch (error) {
      throw new Error('' + error);
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    const existingUser = await this.repo.findOneByOrFail({ id });
    existingUser.username = dto.username;
    existingUser.password = bcrypt.hashSync(dto.password, 10);
    const role = await this.repoRole.findOneBy({ id: dto.roleId });
    existingUser.role = role;

    return this.repo.save(existingUser);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
