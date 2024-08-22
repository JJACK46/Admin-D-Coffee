import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly repo: Repository<Branch>,
    @InjectRepository(Inventory)
    private readonly repoInv: Repository<Inventory>,
  ) {}
  create(dto: CreateBranchDto) {
    const inv = this.repoInv.create({ name: dto.name });
    const branch = this.repo.create({ ...dto, inventory: inv });
    return this.repo.save(branch);
  }

  findAll() {
    return this.repo.find();
  }

  findAllShort() {
    return this.repo.find({ select: ['id', 'name'] });
  }

  findAllWithInventory() {
    return this.repo.find({ relations: { inventory: true } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findOneWithInventory(name: string) {
    return this.repo.findOne({
      where: { name: name },
      relations: { inventory: { inventoryItems: true } },
    });
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return this.repo.update(id, updateBranchDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
