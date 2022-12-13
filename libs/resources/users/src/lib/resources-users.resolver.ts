import { User } from '@int-garage-management-monorepo/prisma-nestjs-graphql';
import {
  AuthenticatedResolver,
} from '@int-garage-management-monorepo/shared';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ResourcesUsersService } from './resources-users.service';
import { FindManyUserArgs } from '@int-garage-management-monorepo/prisma-nestjs-graphql';

@Resolver(() => User)
export class ResourcesUsersResolver extends AuthenticatedResolver {
  constructor(private readonly usersService: ResourcesUsersService) {
    super();
  }

  @Query(() => [User], { name: 'UserFindAll' })
  async getUsers(@Args() args: FindManyUserArgs) {
    return await this.usersService.findMany(args);
  }
}
