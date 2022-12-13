import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Float)
export class CoreResolver {
  @Query(() => Float)
  uptime() {
    return process.uptime();
  }
}
