import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    readonly repo: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.repo.save(createProductDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, createProductDto: UpdateProductDto) {
    return this.repo.update(id, createProductDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
