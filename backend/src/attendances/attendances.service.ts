import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Repository } from 'typeorm';
import { TrackAttendanceDto } from './dto/track-attendance.dto';

import { Employee } from 'src/employees/entities/employee.entity';
@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repo: Repository<Attendance>,
    @InjectRepository(Employee)
    private readonly repoEmp: Repository<Employee>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const emp = await this.repoEmp.findOneBy({
      id: createAttendanceDto.employeeId,
    });
    const item = this.repo.create({
      date: createAttendanceDto.date,
      employee: emp,
      clockIn: createAttendanceDto.clockIn,
      clockOut: '',
      timeWorked: 0,
      typeWork: '',
    });
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find({ relations: { employee: true } });
  }

  async findAllWhereEmployee(id: number) {
    const user = await this.repoEmp.findOneBy({ id });
    return this.repo.find({
      where: { employee: user },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id: id },
      relations: { employee: true },
    });
  }

  async findTrackingOne(trackItem: TrackAttendanceDto) {
    const emp = await this.repoEmp.findOneBy({ id: trackItem.employeeId });
    return this.repo.findOneBy({
      employee: emp,
      date: trackItem.date,
    });
  }

  async update(updateAttendanceDto: UpdateAttendanceDto) {
    const existItem = await this.repo.findOneBy({ id: updateAttendanceDto.id });
    existItem.clockOut = updateAttendanceDto.clockOut;
    existItem.timeWorked = updateAttendanceDto.timeWorked;
    existItem.typeWork = updateAttendanceDto.typeWork;
    return this.repo.update(updateAttendanceDto.id, updateAttendanceDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
