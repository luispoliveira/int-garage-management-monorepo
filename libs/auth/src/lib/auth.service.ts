import { User } from '@int-garage-management-monorepo/prisma-nestjs-graphql';
import { ResourcesUsersService } from '@int-garage-management-monorepo/resources/users';
import { PasswordUtils } from '@int-garage-management-monorepo/utils';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseType } from './object-types/login.model';
import { JwtPayloadType } from './types/jwt-paylod.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: ResourcesUsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) return null;

    if (await PasswordUtils.compare(user.password, password)) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException(`Username or password is incorrect`);
    }
  }

  async login(user: User): Promise<LoginResponseType> {
    const payload: JwtPayloadType = {
      userId: user.id,
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      userId: user.id,
      username: user.username,
    };
  }
}
