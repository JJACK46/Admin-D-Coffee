import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException('Password incorrect');
    }
    const payload = {
      id: user.id,
      usr: user.username,
      img: user.employee.imageUrl,
      role: user.role.name,
      branch: user.employee?.branch ?? null,
      empId: user.employee?.id,
      cusId: user.customer?.id,
      name: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
