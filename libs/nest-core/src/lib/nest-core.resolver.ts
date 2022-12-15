import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Float)
export class NestCoreResolver {
  @Query(() => Float)
  uptime() {
    return process.uptime();
  }
}
