import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from 'src/branch/entities/branch.entity';
import { Receipt } from 'src/receipts/entities/receipt.entity';
import { Repository } from 'typeorm';
import { RevenueDTO } from './dto/revenue.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly repoReceipt: Repository<Receipt>,
    @InjectRepository(Branch)
    private readonly repoBranch: Repository<Branch>,
  ) {}

  async getDaily(dto: RevenueDTO) {
    try {
      const startDate = new Date(dto.year, dto.month - 1, 1);
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0,
      );
      const queryBuilder = this.repoReceipt
        .createQueryBuilder('receipt')
        .select('SUM(receipt.totalNet)', 'totalNet')
        .addSelect("DATE_FORMAT(receipt.createdDate,'%d')", 'date')
        .where('receipt.createdDate BETWEEN :startDate AND :endDate', {
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
        })
        .groupBy('date')
        .orderBy('date');
      if (dto.branchId) {
        queryBuilder.andWhere('receipt.branchId = :id', { id: dto.branchId });
      }
      return queryBuilder.getRawMany();
    } catch (error) {
      console.log('getDaily Error: ' + error);
    }
  }
  async getMonthly(dto: RevenueDTO) {
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
        .groupBy('month')
        .orderBy('month');
      if (dto.branchId) {
        queryBuilder.andWhere('receipt.branchId = :id', { id: dto.branchId });
      }
      return queryBuilder.getRawMany();
    } catch (error) {
      console.log('getMonthly Error: ' + error);
    }
  }

  async getYearly(dto: RevenueDTO) {
    try {
      const queryBuilder = this.repoReceipt
        .createQueryBuilder('receipt')
        .select("DATE_FORMAT(receipt.createdDate,'%Y')", 'year')
        .addSelect('SUM(receipt.totalNet)', 'totalNet')
        .groupBy('year')
        .orderBy('year');
      if (dto.branchId) {
        queryBuilder.andWhere('receipt.branchId = :id', { id: dto.branchId });
      }
      return queryBuilder.getRawMany();
    } catch (error) {
      console.log('getYearly Error :' + error);
    }
  }

  async getLastDayAndCurrentSold(branchId?: number) {
    const nowDate = new Date();

    try {
      const pastDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate() - 1,
      );

      const pastQueryBuilder = this.repoReceipt
        .createQueryBuilder('sales')
        .select('SUM(sales.totalNet)', 'pastTotal')
        .where('sales.createdDate BETWEEN :pastStartDate AND :pastEndDate', {
          pastStartDate: pastDate.toLocaleDateString('fr-CA'),
          pastEndDate: pastDate.toLocaleDateString('fr-CA'),
        });

      const nowQueryBuilder = this.repoReceipt
        .createQueryBuilder('sales')
        .select('SUM(sales.totalNet)', 'nowTotal')
        .where('sales.createdDate BETWEEN :nowStartDate AND :nowEndDate', {
          nowStartDate: nowDate.toLocaleDateString('fr-CA'),
          nowEndDate: nowDate.toLocaleDateString('fr-CA'),
        });

      if (branchId) {
        pastQueryBuilder.andWhere('sales.branchId = :branchId', { branchId });
        nowQueryBuilder.andWhere('sales.branchId = :branchId', { branchId });
      }

      const [pastResult, currentResult] = await Promise.all([
        pastQueryBuilder.getRawOne(),
        nowQueryBuilder.getRawOne(),
      ]);

      const pastTotal = pastResult ? pastResult.pastTotal : 0;
      const currentTotal = currentResult ? currentResult.nowTotal : 0;

      return { yesterday: pastTotal, today: currentTotal };
    } catch (error) {
      console.error('Error retrieving sales data:', error);
      throw new Error('Failed to retrieve sales data');
    }
  }

  async getLastMonthAndCurrentSold(branchId?: number) {
    const nowDate = new Date();

    try {
      const pastMonthStart = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() - 1,
        1,
      );
      const pastMonthEnd = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        0,
      );

      const pastMonthQueryBuilder = this.repoReceipt
        .createQueryBuilder('sales')
        .select('SUM(sales.totalNet)', 'pastTotal')
        .where('sales.createdDate BETWEEN :pastStartDate AND :pastEndDate', {
          pastStartDate: pastMonthStart.toISOString().slice(0, 10),
          pastEndDate: pastMonthEnd.toISOString().slice(0, 10),
        });

      const currentMonthQueryBuilder = this.repoReceipt
        .createQueryBuilder('sales')
        .select('SUM(sales.totalNet)', 'nowTotal')
        .where('sales.createdDate BETWEEN :nowStartDate AND :nowEndDate', {
          nowStartDate: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
            .toISOString()
            .slice(0, 10),
          nowEndDate: nowDate.toISOString().slice(0, 10),
        });

      if (branchId) {
        pastMonthQueryBuilder.andWhere('sales.branchId = :branchId', {
          branchId,
        });
        currentMonthQueryBuilder.andWhere('sales.branchId = :branchId', {
          branchId,
        });
      }

      const [pastResult, currentResult] = await Promise.all([
        pastMonthQueryBuilder.getRawOne(),
        currentMonthQueryBuilder.getRawOne(),
      ]);

      const pastTotal = pastResult ? pastResult.pastTotal : 0;
      const currentTotal = currentResult ? currentResult.nowTotal : 0;

      return { lastMonth: pastTotal, thisMonth: currentTotal };
    } catch (error) {
      console.error('Error retrieving sales data:', error);
      throw new Error('Failed to retrieve sales data');
    }
  }

  async getLastYearAndCurrentSold(branchId?: number) {
    const currentYear = new Date().getFullYear();

    const pastYearQueryBuilder = this.repoReceipt
      .createQueryBuilder('sales')
      .select('SUM(sales.totalNet)', 'pastTotal')
      .where(
        'CAST(SUBSTRING(sales.createdDate, 1, 4) AS INTEGER) = :pastYear',
        { pastYear: currentYear - 1 },
      );

    const currentYearQueryBuilder = this.repoReceipt
      .createQueryBuilder('sales')
      .select('SUM(sales.totalNet)', 'nowTotal')
      .where(
        'CAST(SUBSTRING(sales.createdDate, 1, 4) AS INTEGER) = :currentYear',
        { currentYear },
      );

    if (branchId) {
      pastYearQueryBuilder.andWhere('sales.branchId = :branchId', { branchId });
      currentYearQueryBuilder.andWhere('sales.branchId = :branchId', {
        branchId,
      });
    }

    const [pastResult, currentResult] = await Promise.all([
      pastYearQueryBuilder.getRawOne(),
      currentYearQueryBuilder.getRawOne(),
    ]);

    const pastTotal = pastResult ? pastResult.pastTotal : 0;
    const currentTotal = currentResult ? currentResult.nowTotal : 0;

    return { lastYear: pastTotal, thisYear: currentTotal };
  }
}
