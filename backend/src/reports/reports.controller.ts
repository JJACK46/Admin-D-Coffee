import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RevenueDTO } from './dto/revenue.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('revenue')
  async getRevenue(@Body() dto: RevenueDTO) {
    return {
      day: await this.reportsService.getDaily(dto),
      month: await this.reportsService.getMonthly(dto),
      year: await this.reportsService.getYearly(dto),
    };
  }

  @Get('sales')
  async getSales() {
    return {
      dailySales: await this.reportsService.getLastDayAndCurrentSold(),
      monthlySales: await this.reportsService.getLastMonthAndCurrentSold(),
      yearlySales: await this.reportsService.getLastYearAndCurrentSold(),
    };
  }

  @Get('sales/:branchId')
  async getDashboardByBranchId(@Param('branchId') branchId: string) {
    return {
      dailySales: await this.reportsService.getLastDayAndCurrentSold(+branchId),
      monthlySales:
        await this.reportsService.getLastMonthAndCurrentSold(+branchId),
      yearlySales:
        await this.reportsService.getLastYearAndCurrentSold(+branchId),
    };
  }
}
