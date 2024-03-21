import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log(user.password);
    if(user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(data.email);
    if(user && bcrypt.compareSync(data.password, user.password)) {
      const payload = { id: user.id, email: user.email, roleId: user.roleId };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException();
  }
}
