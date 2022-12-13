import { User } from '@int-garage-management-monorepo/prisma-nestjs-graphql';
import { ResourcesUsersService } from '@int-garage-management-monorepo/resources/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadType } from '../types/jwt-paylod.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: ResourcesUsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configService.get<boolean>('jwtIgnoreExpiration'),
      secretOrKey: configService.get<string>('jwtSecret'),
    });
  }

  async validate(payload: JwtPayloadType): Promise<User> {
    const { userId } = payload;

    const user = await this.usersService.findUnique({ where: { id: userId } });

    if (!user) throw new UnauthorizedException(`User doesn't exist.`);

    return user;
  }
}
