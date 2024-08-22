import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { TrackAttendanceDto } from './dto/track-attendance.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Post()
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendancesService.create(createAttendanceDto);
  }

  @Get()
  findAll() {
    return this.attendancesService.findAll();
  }

  @Get('user/:id')
  findAllWhereUser(@Param('id') id: string) {
    return this.attendancesService.findAllWhereEmployee(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendancesService.findOne(+id);
  }

  @Get('track/:uid/:date')
  findTrackingOne(@Param('uid') uid: string, @Param('date') date: string) {
    return this.attendancesService.findTrackingOne(<TrackAttendanceDto>{
      employeeId: +uid,
      date: date,
    });
  }

  @Patch()
  update(@Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendancesService.update(updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendancesService.remove(+id);
  }
}
