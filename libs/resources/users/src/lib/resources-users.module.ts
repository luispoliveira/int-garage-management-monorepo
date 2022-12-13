import { Module, Global } from '@nestjs/common';
import { ResourcesUsersResolver } from './resources-users.resolver';
import { ResourcesUsersService } from './resources-users.service';

@Global()
@Module({
  providers: [ResourcesUsersService, ResourcesUsersResolver],
  exports: [ResourcesUsersService],
})
export class ResourcesUsersModule {}
