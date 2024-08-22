import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDTO } from './dto/profile.dto';
import { Public } from 'src/auth/constants';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @Post('sales')
  async getSalesCharts(@Body() dto: ProfileDTO) {
    return {
      daily: await this.profileService.getSalesDay(dto),
      monthly: await this.profileService.getSalesMonth(dto),
      yearly: await this.profileService.getSalesYear(dto),
    };
  }
}
