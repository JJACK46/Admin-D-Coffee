import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { Payroll } from 'src/payroll/entities/payroll.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Repository } from 'typeorm';
import { ProfileDTO } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Receipt)
    private readonly repoReceipt: Repository<Receipt>,
    @InjectRepository(Attendance)
    private readonly repoAtt: Repository<Attendance>,
    @InjectRepository(Payroll)
    private readonly repoPay: Repository<Payroll>,
  ) {}

  getSalesDay(dto: ProfileDTO) {
    try {
      const startDate = new Date(dto.year, dto.month - 1, 1); //month - 1 because the Date constructed count 0 as Jan
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0,
      );

      const queryBuilder = this.repoReceipt
        .createQueryBuilder('receipt')
        .select('SUM(receipt.totalNet)', 'totalNet')
        .addSelect("DATE_FORMAT(receipt.createdDate,'%d')", 'date')
        .addSelect('receipt.createdTime', 'time')
        .where('receipt.createdDate BETWEEN :startDate AND :endDate', {
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        })
        .andWhere('receipt.userId = :id', { id: dto.userId })
        .groupBy('date')
        .orderBy('date', 'DESC');

      return queryBuilder.getRawMany();
    } catch (e) {
      throw new Error();
    }
  }
  getSalesMonth(dto: ProfileDTO) {
    try {
      const startDate = new Date(dto.year, 0, 1);
      const endDate = new Date(dto.year, 11, 31);

      const queryBuilder = this.repoReceipt
        .createQueryBuilder('receipt')
        .select("DATE_FORMAT(receipt.createdDate,'%m')", 'month')
        .addSelect('SUM(receipt.totalNet)', 'totalNet')
        .where('receipt.createdDate BETWEEN :startDate AND :endDate', {
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        })
        .andWhere('receipt.userId = :id', { id: dto.userId })
        .groupBy('month')
        .orderBy('month');

      return queryBuilder.getRawMany();
    } catch (e) {
      throw new Error();
    }
  }
  getSalesYear(dto: ProfileDTO) {
    try {
      const queryBuilder = this.repoReceipt
        .createQueryBuilder('receipt')
        .select("DATE_FORMAT(receipt.createdDate,'%Y')", 'year')
        .addSelect('SUM(receipt.totalNet)', 'totalNet')
        .andWhere('receipt.userId = :id', { id: dto.userId })
        .groupBy('year')
        .orderBy('year');

      return queryBuilder.getRawMany();
    } catch (e) {
      throw new Error();
    }
  }
}
