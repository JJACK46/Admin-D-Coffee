import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly repo: Repository<Promotion>,
    @InjectRepository(Product)
    private readonly repoProduct: Repository<Product>,
  ) {}

  async create(dto: CreatePromotionDto) {
    const promotion = this.repo.create({ ...dto });
    if (dto.usableProductsId) {
      const products = await Promise.all(
        dto.usableProductsId.map((id) =>
          this.repoProduct.findOneByOrFail({ id: id }),
        ),
      );
      promotion.usableProducts = products;
    }

    return this.repo.save(promotion);
  }

  findAll() {
    return this.repo.find({
      relations: {
        usableProducts: true,
      },
    });
  }

  findOne(id: number) {
    return this.repo.find({
      where: { id: id },
      relations: {
        usableProducts: true,
      },
    });
  }

  async update(id: number, dto: UpdatePromotionDto) {
    const promotion = this.repo.create({ ...dto, id: id });
    if (dto.usableProductsId) {
      const products = await Promise.all(
        dto.usableProductsId.map((id) =>
          this.repoProduct.findOneByOrFail({ id: id }),
        ),
      );
      promotion.usableProducts = products;
    }
    return this.repo.save(promotion);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
