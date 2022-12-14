import { Module, Global } from '@nestjs/common';
import { ResourcesUsersCommand } from './resources-users.command';
import { ResourcesUsersResolver } from './resources-users.resolver';
import { ResourcesUsersService } from './resources-users.service';

@Global()
@Module({
  providers: [
    ResourcesUsersService,
    ResourcesUsersResolver,
    ResourcesUsersCommand,
  ],
  exports: [ResourcesUsersService],
})
export class ResourcesUsersModule {}
