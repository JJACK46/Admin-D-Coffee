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
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };
    return {
      // user: {
      //   id: user.id,
      //   username: user.username,
      //   imageUrl: user.imageUrl,
      //   role: user.role.name,
      //   employeeId: user.employeeId,
      //   customerId: user.customerId,
      //   fullName: user.fullName,
      //   branch: user.employee?.branch ?? null,
      // },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
