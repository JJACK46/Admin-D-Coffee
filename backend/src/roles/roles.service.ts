import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}
  create(createUserRoleDto: CreateRoleDto) {
    return this.repo.save(createUserRoleDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  update(id: number, updateUserRoleDto: UpdateRoleDto) {
    return this.repo.update(id, updateUserRoleDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
