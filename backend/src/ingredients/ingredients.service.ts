import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    readonly repo: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    return this.repo.save(createIngredientDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.repo.update(id, updateIngredientDto);
  }

  updateAll(updateIngredientDto: UpdateIngredientDto[]) {
    return this.repo.upsert(updateIngredientDto, ['id']);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
