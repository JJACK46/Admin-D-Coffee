import { Injectable } from '@nestjs/common';
import { CreateStockTakingDto } from './dto/create-stock-taking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTaking } from './entities/stock-taking.entity';
import { Repository } from 'typeorm';
import { StockTakingItem } from 'src/stock-taking/entities/stock-taking-item.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class StockTakingService {
  constructor(
    @InjectRepository(StockTaking)
    private readonly repo: Repository<StockTaking>,
    @InjectRepository(StockTakingItem)
    private readonly repoStockItems: Repository<StockTakingItem>,
    @InjectRepository(Inventory)
    private readonly repoInventory: Repository<Inventory>,
    @InjectRepository(InventoryItem)
    private readonly repoInventoryItem: Repository<InventoryItem>,
    @InjectRepository(Employee)
    private readonly repoEmp: Repository<Employee>,
  ) {}

  async create(dto: CreateStockTakingDto) {
    const inv = await this.repoInventory.findOneByOrFail({
      id: dto.inventoryId,
    });
    const emp = await this.repoEmp.findOneByOrFail({ id: dto.employeeId });
    const stkItems = await Promise.all(
      dto.stockTakingItems.map(async (item) => {
        const invItem = await this.repoInventoryItem.findOneByOrFail({
          id: item.inventoryItemId,
        });
        const stkItem = this.repoStockItems.create({
          inventoryItem: invItem,
          balanceOld: item.balanceOld,
          balanceUpdate: item.balanceUpdate,
        });
        return stkItem;
      }),
    );
    const stock = this.repo.create({
      inventory: inv,
      createdDate: dto.createdDate,
      stockTakingItems: stkItems,
      employee: emp,
    });
    return this.repo.save(stock);
  }

  findAll() {
    return this.repo.find({
      relations: {
        employee: true,
      },
    });
  }

  findAllWithFilter(year: number, month: number) {
    const startMonth = () => {
      if (month === 0 || month === undefined) {
        return 0;
      }
      return month - 1;
    };
    const endMonth = () => {
      if (month === 0 || month === undefined) {
        return 11;
      }
      return month;
    };
    return this.repo
      .createQueryBuilder('stock_taking')
      .select('stock_taking')
      .where('stock_taking.createdDate BETWEEN :startDate AND :endDate', {
        startDate: new Date(year, startMonth(), 1).toLocaleDateString('fr-CA'),
        endDate: new Date(year, endMonth(), 0).toLocaleDateString('fr-CA'),
      })
      .leftJoinAndSelect('stock_taking.stockTakingItems', 'stockTakingItems')
      .leftJoinAndSelect('stock_taking.employee', 'employee')
      .leftJoinAndSelect('stock_taking.inventory', 'inventory')
      .leftJoinAndSelect('stockTakingItems.inventoryItem', 'inventoryItem')
      .leftJoinAndSelect('inventoryItem.ingredient', 'ingredient')
      .orderBy('createdDate', 'DESC')

      .getMany();
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id: id },
      relations: {
        employee: true,
      },
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
