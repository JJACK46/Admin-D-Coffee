import { Injectable } from '@nestjs/common';
import { CreateReplenishmentDto } from './dto/create-replenishment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Replenishment } from './entities/replenishment.entity';
import { Repository } from 'typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { ReplenishmentItem } from 'src/replenishment/entities/replenishment-items.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class ReplenishmentService {
  constructor(
    @InjectRepository(Replenishment)
    private readonly repo: Repository<Replenishment>,
    @InjectRepository(ReplenishmentItem)
    private readonly repoItems: Repository<ReplenishmentItem>,
    @InjectRepository(Inventory)
    private readonly repoInventory: Repository<Inventory>,
    @InjectRepository(Employee)
    private readonly repoEmp: Repository<Employee>,
    @InjectRepository(Ingredient)
    private readonly repoIng: Repository<Ingredient>,
  ) {}

  async create(dto: CreateReplenishmentDto) {
    const emp = await this.repoEmp.findOneByOrFail({ id: dto.employeeId });
    const inv = await this.repoInventory.findOneByOrFail({
      id: dto.inventoryId,
    });
    const items = await Promise.all(
      dto.replenishmentItems.map(async (item) => {
        const ing = await this.repoIng.findOneByOrFail({
          id: item.ingredientId,
        });
        return this.repoItems.create({
          ...item,
          ingredient: ing,
        });
      }),
    );
    const replenishment = this.repo.create({
      ...dto,
      employee: emp,
      inventory: inv,
      replenishmentItems: items,
    });
    return this.repo.save(replenishment);
  }

  findAll() {
    return this.repo.find({
      relations: {
        replenishmentItems: { ingredient: true },
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
      .createQueryBuilder('replenishment')
      .select('replenishment')
      .leftJoinAndSelect(
        'replenishment.replenishmentItems',
        'replenishmentItems',
      )
      .leftJoinAndSelect('replenishmentItems.ingredient', 'ingredient')
      .leftJoinAndSelect('replenishment.employee', 'employee')
      .leftJoinAndSelect('replenishment.inventory', 'inventory')
      .where('replenishment.createdDate BETWEEN :startDate AND :endDate', {
        startDate: new Date(year, startMonth(), 1).toLocaleDateString('fr-CA'),
        endDate: new Date(year, endMonth(), 0).toLocaleDateString('fr-CA'),
      })
      .orderBy('createdDate', 'DESC')

      .getMany();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  findOneById(id: number) {
    return this.repo.find({
      where: { id: id },
      relations: {
        replenishmentItems: { ingredient: true },
        employee: true,
      },
    });
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
