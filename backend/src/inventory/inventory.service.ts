import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';
import { InventoryItem } from 'src/inventory/entities/inventory-item.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly repo: Repository<Inventory>,
    @InjectRepository(InventoryItem)
    private readonly repoItems: Repository<InventoryItem>,
    @InjectRepository(Ingredient)
    private readonly repoIng: Repository<Ingredient>,
  ) {}

  async create(dto: CreateInventoryDto) {
    const items = await Promise.all(
      dto.inventoryItems.map((item) => this.repoItems.create(item)),
    );
    const inventory = this.repo.create({
      ...dto,
      inventoryItems: items,
    });

    return this.repo.save(inventory);
  }

  findAll() {
    return this.repo.find({});
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id: id },
      relations: { inventoryItems: { ingredient: true } },
    });
  }

  async findOneById(id: number) {
    return this.repo.findOneByOrFail({ id });
  }

  async update(id: number, dto: UpdateInventoryDto) {
    const existInventory = await this.repo.findOneByOrFail({ id: id });
    if (existInventory) {
      const items = await Promise.all(
        dto.inventoryItems.map(async (item) => {
          const ingredient = await this.repoIng.findOneBy({
            id: item.ingredientId,
          });
          return this.repoItems.create({ ...item, ingredient: ingredient });
        }),
      );
      const updatedInv = this.repo.create({
        id: existInventory.id,
        ...dto,
        inventoryItems: items,
      });
      this.repo.save(updatedInv);
    }
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
