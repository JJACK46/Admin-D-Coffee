import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.repo.save(createCustomerDto);
  }

  findAll() {
    return this.repo.find();
  }

  async findAllWithPurchase() {
    const customers = await this.repo.find();
    const results = await Promise.all(
      customers.map(async (customer) => {
        const purchase = await this.findPurchaseByCusId(customer.id);
        return {
          ...customer,
          fullName: customer.fullName,
          purchase: purchase,
        };
      }),
    );
    return results;
  }

  async findPurchaseByCusId(id: number) {
    const mostOne = await this.repo
      .createQueryBuilder('customer')
      .select('product', 'product')
      .addSelect('SUM(receiptItems.amount)', 'totalAmount')
      .addSelect('SUM(receiptItems.price)', 'price')
      .leftJoin('customer.receipts', 'receipts')
      .leftJoin('receipts.receiptItems', 'receiptItems')
      .leftJoin('receiptItems.product', 'product')
      .where('customer.id = :id', { id: id })
      .groupBy('product.name')
      .orderBy('totalAmount', 'DESC')
      .getRawOne();

    const totalSpending = await this.repo
      .createQueryBuilder('customer')
      .select('SUM(receiptItems.price)', 'totalSpending')
      .leftJoin('customer.receipts', 'receipts')
      .leftJoin('receipts.receiptItems', 'receiptItems')
      .leftJoin('receiptItems.product', 'product')
      .where('customer.id = :id', { id: id })
      .orderBy('totalSpending', 'DESC')
      .getRawOne();

    return { mostOne: mostOne, ...totalSpending };
  }

  async findPurchaseCountByCustomerId(customerId: number): Promise<number> {
    try {
      const purchaseCount = await this.repo
        .createQueryBuilder('customer')
        .select('COUNT(receipts.id)', 'purchaseCount')
        .leftJoin('customer.receipts', 'receipts')
        .where('customer.id = :id', {
          id: customerId,
        })
        .getRawOne();

      return purchaseCount.purchaseCount || 0;
    } catch (error) {
      if (error.code === '23503') {
        // Handle specific constraint violation error
        throw new Error('Customer not found');
      } else {
        throw error;
      }
    }
  }

  async findOne(id: number) {
    const customer = await this.repo.findOneBy({ id });
    const purchase = await this.findPurchaseByCusId(customer.id);
    return {
      ...customer,
      purchase: purchase,
    };
  }

  update(updateCustomerDto: UpdateCustomerDto) {
    return this.repo.update(updateCustomerDto.id, updateCustomerDto);
  }

  updatePoints(id: number, point: number) {
    return this.repo
      .createQueryBuilder()
      .update(Customer)
      .set({ point: point })
      .where('id = :id', { id: id })
      .execute();
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
