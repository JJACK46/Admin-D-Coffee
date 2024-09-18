import { Injectable } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Repository } from 'typeorm';
import { Promotion } from 'src/promotions/entities/promotion.entity';
import { ReceiptItem } from 'src/receipts/entities/receipt-item.entity';
import { Branch } from 'src/branch/entities/branch.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly repo: Repository<Receipt>,
    @InjectRepository(Promotion)
    private readonly repoPromotion: Repository<Promotion>,
    @InjectRepository(Employee)
    private readonly repoEmp: Repository<Employee>,
    @InjectRepository(Branch)
    private readonly repoBranch: Repository<Branch>,
    @InjectRepository(Customer)
    private readonly repoCus: Repository<Customer>,
    @InjectRepository(ReceiptItem)
    private readonly repoItem: Repository<ReceiptItem>,
    @InjectRepository(Product)
    private readonly repoProduct: Repository<Product>,
  ) {}

  async create(dto: CreateReceiptDto) {
    const createdReceiptItems: ReceiptItem[] = await Promise.all(
      dto.receiptItems.map(async (item) => {
        const product = await this.repoProduct.findOneByOrFail({
          id: item.productId,
        });
        return this.repoItem.create({
          ...item,
          product: product,
        });
      }),
    );

    const existEmp = await this.repoEmp.findOneByOrFail({
      id: dto.employeeId,
    });
    const existBranch: Branch = await this.repoBranch.findOneByOrFail({
      id: dto.branchId,
    });

    const receipt = this.repo.create({
      ...dto,
      receiptItems: createdReceiptItems,
      employee: existEmp,
      branch: existBranch,
    });

    return this.repo.save(receipt);
  }

  findAll(skip: number, take: number) {
    if (take === -1) {
      take = 100;
    }
    return this.repo.find({
      relations: {
        customer: true,
        promotion: true,
        employee: true,
      },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }

  findAllWithFilter(year: number, month: number) {
    if (isNaN(year) || year === null || year === undefined) {
      throw new Error('Invalid year provided');
    }

    if (
      isNaN(month) ||
      month === null ||
      month === undefined ||
      month < 0 ||
      month > 11
    ) {
      throw new Error('Invalid month provided');
    }

    const startMonth = () => {
      return month === 0 ? 0 : month - 1;
    };

    const endMonth = () => {
      return month === 0 ? 11 : month;
    };
    return this.repo
      .createQueryBuilder('receipt')
      .select('receipt')
      .leftJoinAndSelect('receipt.receiptItems', 'receiptItems')
      .leftJoinAndSelect('receiptItems.product', 'product')
      .leftJoinAndSelect('receipt.employee', 'employee')
      .leftJoinAndSelect('receipt.customer', 'customer')
      .leftJoinAndSelect('receipt.branch', 'branch')
      .where('receipt.createdDate BETWEEN :startDate AND :endDate', {
        startDate: new Date(year, startMonth(), 1).toLocaleDateString('fr-CA'),
        endDate: new Date(year, endMonth(), 0).toLocaleDateString('fr-CA'),
      })
      .orderBy('receipt.createdDate', 'DESC')

      .getMany();
  }

  findAllWhereEmployee(id: number) {
    return this.repo.find({
      where: { employee: { id: id } },
      relations: {
        customer: true,
        promotion: true,
        employee: true,
      },
    });
  }

  findAllWhereCustomer(id: number) {
    return this.repo.find({
      where: { customer: { id: id } },
      relations: {
        customer: true,
        promotion: true,
        employee: true,
      },
    });
  }

  findOne(id: number) {
    return this.repo.find({
      where: { id: id },
      relations: {
        promotion: true,
        customer: true,
        employee: true,
      },
    });
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
