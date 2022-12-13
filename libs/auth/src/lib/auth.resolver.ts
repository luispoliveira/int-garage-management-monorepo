import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@int-garage-management-monorepo/prisma-nestjs-graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './input-types/login.input';
import { LoginResponseType } from './object-types/login.model';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseType)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.validateUser(
      loginInput.username,
      loginInput.password
    );

    if (!user) throw new UnauthorizedException(`User doesn't exist.`);

    //TODO:chec isActive

    return this.authService.login(user as User);
  }
}
