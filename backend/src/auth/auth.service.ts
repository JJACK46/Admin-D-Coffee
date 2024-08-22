import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    let user: User;
    try {
      user = await this.usersService.findOneByName(username);
    } catch (e) {
      throw new UnauthorizedException('User not found');
    }
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new UnauthorizedException('Password incorrect');
    }
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException('Password incorrect');
    // }
    const payload = { sub: user.id, username: user.username };
    return {
      user: {
        id: user.id,
        username: user.username,
        imageUrl: user.imageUrl,
        role: user.role.name,
        employeeId: user.employeeId,
        customerId: user.customerId,
        fullName: user.fullName,
        branch: user.employee?.branch ?? null,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
